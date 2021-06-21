import awaitToJs from 'await-to-js';
import db from '../DBConnection';

class TransactionRegister implements ITransactionRegister {
    async createTransaction(transactionData: TransactionData) {
        const [error, transactionObj] = await awaitToJs(db.Transaction.create(transactionData));
        if (error) {
            throw error;
        }
        return transactionObj;
    }
}
 export default TransactionRegister;
