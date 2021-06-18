import awaitToJs from 'await-to-js';
import db from '../DBConnection';
import { Transaction } from '../Classes';

class TransactionRepository {

    static async createTransaction(transaction: Transaction) {
       const [error, transactionObj] = await awaitToJs(db.Transaction.create(transaction));
       if(error) {
           throw error;
       }
       return transactionObj;
    };

    static async getTransactionList(where:any) {
        const [error, transactionList] = await awaitToJs(db.Transaction.findAll({ where, raw: true }));
        if(error) {
            throw error;
        }
        return transactionList;
    }
}
export default TransactionRepository;
