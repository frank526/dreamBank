import awaitToJs from 'await-to-js';
import config from '../../config';
import {
    TransactionManager,
 } from '../../Managers';
import { TransactionRepository } from '../../Repositories';

const { 
    STATUS_CODE_400,
    STATUS_CODE_201,
    STATUS_CODE_500,
} = config;

const generateTransaction: Middleware = async (req, res) => {
    if (!req.body || !req.body.transactionData) {
        const error = 'Transaction data is required';
        return res.status(STATUS_CODE_400).send(error);
    }
    const { originAccountNumber, destinyAccountNumber, amount } = req.body.transactionData;
    const [error, trasnactionCreated] = await awaitToJs(TransactionManager.createTransaction(originAccountNumber, destinyAccountNumber, amount));
    if (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return res.status(STATUS_CODE_201).json({ Transaction: trasnactionCreated.toJSON() });
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
    generateTransaction,
    getTransactionList,
};
