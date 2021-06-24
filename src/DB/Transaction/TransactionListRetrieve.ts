import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class TransactionDBListRetrieve implements ITransactionListRetrieveDB { 
    async getTransactionList(where: TransactionWhere, attributes?:string[]){
        const [error, transaction] = await awaitToJs(
            db.Transaction.findAll({ attributes, where, raw: true})) as TransactionData[];
        if(error) {
            throw error;
        }
        return transaction;
    }
}

export default TransactionDBListRetrieve;
