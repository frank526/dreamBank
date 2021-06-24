import awaitToJs from 'await-to-js';
import { TransactionRetrieve } from '../../DB/Transaction';

class TransactionStorageRetrieve implements ITransactionStorageRetrieve  {
    private transactionStorageRetrieve: ITransactionRetrieveDB;
    constructor() {
        this.transactionStorageRetrieve = new TransactionRetrieve();
    }

    async getTransaction(where: TransactionWhere, attributes?: string[]) {
        const [error, transaction] = await awaitToJs(this.transactionStorageRetrieve.getTransaction(where, attributes));
        if (error) {
            throw error;
        }
        return transaction;
    }
}

export default TransactionStorageRetrieve;
