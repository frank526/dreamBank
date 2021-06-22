import awaitToJs from 'await-to-js';
import config from '../../config';
import {
    TransactionManager,
 } from '../../Managers';

 import { 
     AccountTransactionValidation,
      AccountTransactionProcess } from '../../TransactionClasses'
import { TransactionRepository, CustomerAccountRetrieve, CustomerAccountRepositoryUpdate, TransactionRepositoryCreate } from '../../Repositories';

import { CustomerAccountTransaction, CustomerAccount, BankProductCreator } from '../../Classes';

import { CustomerAccountCreator } from '../../CustomerAccountClasses';

const { 
    STATUS_CODE_400,
    STATUS_CODE_201,
    STATUS_CODE_500,
} = config;

const validateTransaction: MiddlewareNext = async (req, res, next) => {
    if (!req.body || !req.body.transactionData) {
        const error = 'Transaction data is required';
        return res.status(STATUS_CODE_400).send(error);
    }
    const { originAccountNumber, destinyAccountNumber, amount, description } = req.body.transactionData;
    const accountTransaction = new CustomerAccountTransaction(originAccountNumber, destinyAccountNumber, amount);
    const transacionValidation = new AccountTransactionValidation();
    try {
        transacionValidation.executeTransactionValidation(accountTransaction);
    } catch (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return next();
}

const buildCustomerAccount = async(accountNumber: string) => {
    const where = { accountNumber };
    const accountRetrieve = new CustomerAccountRetrieve(where);
    const [error, accountData] = await awaitToJs(accountRetrieve.getCustomerAccount());
    if (error) {
        throw error;
    }
    const customerAccountCreator = new CustomerAccountCreator();
    const customerAccount = customerAccountCreator.createBankProduct(accountData);
    return customerAccount;
}

const buildTransactionData = (originAccount: CustomerAccount, destinyAccount: CustomerAccount, amount:number, description: string) => {
    const transactionData = {
        originAccount:{
            accountNumber: originAccount.getAccountNumber(),
            balance: originAccount.getBalance(),
        },
        destinyAccount: {
            accountNumber: destinyAccount.getAccountNumber(),
            balance: destinyAccount.getBalance(),
        },
        amount,
        description,
    };
    const transactionDataJson = JSON.stringify(transactionData);
    return transactionDataJson;
}

const executeTransaction: MiddlewareNext = async (req, res, next) => {
    const { originAccountNumber, destinyAccountNumber, amount, description } = req.body.transactionData;
    const [error1, originAccount] = await awaitToJs(buildCustomerAccount(originAccountNumber));

    if (error1) {
        return res.status(STATUS_CODE_400).send(error1);
    }

    const [error2, destinyAccount] = await awaitToJs(buildCustomerAccount(destinyAccountNumber));
    if (error2) {
        return res.status(STATUS_CODE_400).send(error1);
    }

    const transactionProcess = new AccountTransactionProcess(originAccount, destinyAccount, amount);

    try {
        transactionProcess.executeTransaction();
    } catch (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    const transactionData = buildTransactionData(originAccount, destinyAccount, amount, description);
    req.body.bankAccounts = transactionData;
    return next();
}

const updateAccountBalance = async(accountData: CustomerAccountData)=> {
    const { balance, accountNumber } = accountData;
    const accountDataToUpdate = {
        balance,
    };
    const where = { accountNumber };
    const accountRepositoriUpdate = new CustomerAccountRepositoryUpdate();
    const [error, update] = await awaitToJs(accountRepositoriUpdate.updateCustomerAccount(accountDataToUpdate, where));

    if(error){
        throw error;
    }
    return update;
}

const registerTransactionInfo = async (req, res) => {
    if (!req.body || !req.body.bankAccounts) {
        return res.status(STATUS_CODE_400).send('Could not be register transaction info');
    }
    const bankAccounts = JSON.parse(req.body.bankAccounts);
    const originAccountData = bankAccounts.originAccount as CustomerAccountData;
    const destinyAccountData = bankAccounts.destinyAccount as CustomerAccountData;
    const transferredAmount = bankAccounts.amount;

    const [error1, update1] = await awaitToJs(updateAccountBalance(originAccountData));
    if (error1) {
        return res.status(STATUS_CODE_400).send('Could not be register transaction info');
    }
    const [error2, update2] = await awaitToJs(updateAccountBalance(destinyAccountData));
    if (error2) {
        return res.status(STATUS_CODE_400).send('Could not be register transaction info');
    }

    const transactionData: TransactionData = {
        originAccountNumber: originAccountData.accountNumber,
        destinyAccountNumber: destinyAccountData.accountNumber,
        transferredAmount,
    };


    const transactionRepositoryCreate = new TransactionRepositoryCreate();

   const [error3, transaction] = await awaitToJs(transactionRepositoryCreate.createTransaction(transactionData));

   if (error3) {
    return res.status(STATUS_CODE_400).send('Could not be register transaction info');
   }

   return res.status(STATUS_CODE_201).json({ Transaction: transaction })
}


/*
const getTransactionList: Middleware = async (req, res) => {
    if (!req.query || !req.query.accountNumber) {
        const error = 'Account Number is required';
        return res.status(STATUS_CODE_500).send(error);
    }
    const { accountNumber } = req.query;
    const filter = { originAccountNumber: accountNumber };
    const [error, transactionList] = await awaitToJs(TransactionRepository.getTransactionList(filter));

    if (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return res.json({ Transactions: transactionList });
}*/

export {
    validateTransaction,
    executeTransaction,
    registerTransactionInfo,
   // getTransactionList,
};
