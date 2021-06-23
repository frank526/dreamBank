import awaitToJs from 'await-to-js';
import TransactionRegister  from './TransactionCreateDB';

class TransactionRepositoryCreate {
    private transactionRepositoryCreate: ITransactionCreateDB;
    constructor() {
        this.transactionRepositoryCreate = new TransactionRegister();
    }

    async createTransaction(transactionData: TransactionData) {
        const [error, transaction] = await awaitToJs(this.transactionRepositoryCreate.create(transactionData));
        if (error) {
            throw error;
        }
        return transaction;
    }
}

export default TransactionRepositoryCreate;
