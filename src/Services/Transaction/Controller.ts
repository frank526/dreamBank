import awaitToJs from 'await-to-js';
import config from '../../config';
import {
    TransactionManager,
 } from '../../Managers';

 import { 
     AccountTransactionValidation,
      AccountTransactionProcess } from '../../TransactionClasses'
import { TransactionRepository, CustomerAccountRetrieve, CustomerAccountRepositoryUpdate } from '../../Repositories';

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
    const { originAccountNumber, destinyAccountNumber, amount } = req.body.transactionData;
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

const executeTransaction: MiddlewareNext = async (req, res, next) => {
    const { originAccountNumber, destinyAccountNumber, amount } = req.body.transactionData;
    const [error1, originAccount] = await awaitToJs(buildCustomerAccount(originAccountNumber));

    if (error1) {
        return res.status(STATUS_CODE_400).send(error1);
    }
    const [error2, destinyAccount] = await awaitToJs(buildCustomerAccount(destinyAccountNumber));
    if (error2) {
        return res.status(STATUS_CODE_400).send(error1);
    }

    const transactionProcess = new AccountTransactionProcess(originAccount, destinyAccount, amount);
    transactionProcess.executeTransaction();

    let originAccountJson: string;
    let destinyAccountJson: string;
    try {
        originAccountJson = JSON.stringify(originAccount);
        destinyAccountJson = JSON.stringify(destinyAccount);
    } catch (error) {
        return res.status(STATUS_CODE_500).send(error);
    }
    const bankAccounts = {
        originAccountJson,
        destinyAccountJson,
    };
    req.body.bankAccounts = bankAccounts;
    return next();
}

const registerTransactionInfo = async (req, res) => {
    if (!req.body || !req.body.bankAccounts) {
        return res.status(STATUS_CODE_400).send('Could not be register transaction info');
    }

    const { originAccountJson, destinyAccountJson } = req.body.bankAccounts;

    if (!originAccountJson || !destinyAccountJson) {
        return res.status(STATUS_CODE_400).send('Could not be register transaction info');
    }

    let originAccount; 
    let destinyAccount;

    try {
        originAccount = JSON.parse(originAccountJson) as ;
        destinyAccount = JSON.parse(destinyAccountJson);
    }catch(error) {
        return res.status(STATUS_CODE_500).send('Could not be register transaction info');
    }

   const accountUpdate = new CustomerAccountRepositoryUpdate();

   const originAccountBalanceUpdate = {
       balance: originAccount
   }

   accountUpdate.updateCustomerAccount();



}



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
}

export {
    validateTransaction,
    getTransactionList,
};
