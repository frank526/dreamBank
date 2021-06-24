import awaitToJs from 'await-to-js';
import { TransactionDBListRetrieve }  from '../../DB/Transaction';

class TransactionListRetrieve implements ITransactionStorageListRetrieve {
    private transactionStorageRetrieve: ITransactionListRetrieveDB;
    constructor() {
        this.transactionStorageRetrieve = new TransactionDBListRetrieve();
    }

    async getTransactionList(where: TransactionWhere, attributes?: string[]) {
        const [error, transaction] = await awaitToJs(this.transactionStorageRetrieve.getTransactionList(where, attributes));
        if (error) {
            throw error;
        }
        return transaction;
    }
}

export default TransactionListRetrieve;
