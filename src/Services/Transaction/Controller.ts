import awaitToJs from 'await-to-js';
import config from '../../config';
import { CustomerAccountRetrieve } from '../../Storage/CustomerAccount';
import { 
    AccountTransactionValidation,
    AccountTransactionProcess,
} from '../../Transaction';

import { CustomerAccountCreator } from '../../CustomerAccountClasses';
import { TransactionListRetrieve, TransactionStorageRetrieve } from '../../Storage/Transaction';

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
    const transactionValidation = new AccountTransactionValidation(originAccountNumber, destinyAccountNumber,amount, description);
    try {
        transactionValidation.validateData();
    } catch (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return next();
}

const buildCustomerAccount = async(accountNumber: string) => {
    const where = { accountNumber };
    const accountRetrieve: ICustomerAccountStorageRetrieve = new CustomerAccountRetrieve();
    const [error, accountData] = await awaitToJs(accountRetrieve.getCustomerAccount(where));
    if (error) {
        throw error;
    }
    const customerAccountCreator = new CustomerAccountCreator();
    const customerAccount = customerAccountCreator.createBankProduct(accountData);
    return customerAccount;
}

const executeTransaction: Middleware = async (req, res) => {
    const { originAccountNumber, destinyAccountNumber, amount, description } = req.body.transactionData;
    const [error1, originAccount] = await awaitToJs(buildCustomerAccount(originAccountNumber));

    if (error1) {
        return res.status(STATUS_CODE_400).send(error1);
    }

    const [error2, destinyAccount] = await awaitToJs(buildCustomerAccount(destinyAccountNumber));
    if (error2) {
        return res.status(STATUS_CODE_400).send(error1);
    }

    const transactionProcess = new AccountTransactionProcess(originAccount, destinyAccount, amount, description);

    let transaction;
    try {
        transaction = await awaitToJs(transactionProcess.executeTransaction());
    } catch (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return res.status(STATUS_CODE_201).json({Transaction: transaction});
}

const getTransactionList: Middleware = async(req, res) => {
    if (!req.query || !req.query.accountNumber) {
        const error = 'Account Number is required';
        return res.status(STATUS_CODE_500).send(error);
    }
    const accountNumber = req.query.accountNumber as string;
    const transactionRetrieve = new TransactionListRetrieve();
    const attributes = ['description', 'transferredAmount'];
    const [error, transactionList] = await awaitToJs(transactionRetrieve.getTransactionList({ originAccountNumber: accountNumber }, attributes));
    if(error) {
        return res.status(STATUS_CODE_500).send(error);
    }
    return res.json( { Transactions: transactionList });
}

const getTransactionDetail: Middleware = async(req, res) => {
    if (!req.query || !req.query.transactionId) {
        const error = 'Transaction ID is required';
        return res.status(STATUS_CODE_500).send(error);
    }
    const transactionId = req.query.transactionId as string;
    const transactionRetrieve = new TransactionStorageRetrieve();
    const [error, transaction] = await awaitToJs(transactionRetrieve.getTransaction({ id : transactionId }));
    if(error) {
        return res.status(STATUS_CODE_500).send(error);
    }
    return res.json( { Transaction: transaction });
}

export {
    validateTransaction,
    executeTransaction,
    getTransactionList,
    getTransactionDetail,
};
