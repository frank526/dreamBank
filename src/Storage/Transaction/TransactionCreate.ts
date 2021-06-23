import awaitToJs from 'await-to-js';
import { TransactionCreate }  from '../../DB/Transaction';

class TransactionStorageCreate {
    private TransactionStorageCreate: ITransactionCreateDB;
    constructor() {
        this.TransactionStorageCreate = new TransactionCreate();
    }

    async create(transactionData: TransactionData) {
        const [error, account] = await awaitToJs(this.TransactionStorageCreate.create(transactionData));
        if (error) {
            throw error;
        }
        return account;
    }
}

export default TransactionStorageCreate;

