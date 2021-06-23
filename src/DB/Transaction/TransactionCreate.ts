import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class TransactionCreate implements ITransactionCreateDB {
    async create(transactionData: TransactionData) {
        const [error, transactionObj] = await awaitToJs(db.Transaction.create(transactionData, {raw:true}));
        if (error) {
            throw error;
        }
        if(!transactionObj) {
            throw 'Transaction no created';
        }
        return transactionObj.toJSON();
    }
}
 export default TransactionCreate;
