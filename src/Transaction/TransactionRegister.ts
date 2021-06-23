import awaitToJs from 'await-to-js';
import { TransactionCreate } from '../Storage/Transaction';

class TransactionRegister implements ITransactionRegister {
    private transactionRepositoryCreate: ITransactionStorageCreate;
    constructor(){
        this.transactionRepositoryCreate = new TransactionCreate();
    }

    async registerTransaction(originAccount: IGetAccountNumber, destinyAccount: IGetAccountNumber, amount:number, description: string) {
        const originAccountNumber = originAccount.getAccountNumber();
        const destinyAccountNumber = destinyAccount.getAccountNumber();
        const transactionData = {
            originAccountNumber,
            destinyAccountNumber,
            transferredAmount: amount,
            description,
        };
        const [error, transaction] = await awaitToJs(this.transactionRepositoryCreate.create(transactionData));
        if (error) {
            throw error;
        }
        return transaction;
    }
}

export default TransactionRegister;
