import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class TransactionRetrieve implements ITransactionRetrieveDB { 
    async getTransaction(where: TransactionWhere, attributes?:string[]){
        const [error, transaction] = await awaitToJs(
            db.Transaction.findOne({ attributes, where, raw: true})) as TransactionData[];
        if(error) {
            throw error;
        }
        return transaction;
    }
}

export default TransactionRetrieve;
