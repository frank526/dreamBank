import { Transaction } from '../Classes';

class TransactionBuildObject {
   private static validateTransactionData(transactionInfo: TransactionData){
        if(!transactionInfo) {
            throw 'Transaction Data is undefined';
        }
        const { originAccountNumber, destinyAccountNumber, transferredAmount } = transactionInfo;

        if(!originAccountNumber) {
            throw 'Origin account number is undefined';
        }
        if(!destinyAccountNumber) {
            throw 'Destiny account number is undefined';
        }
        if(!transferredAmount) {
            throw 'transferredAmount is undefined';
        }
    };
   static getTransactionObject(transactionInfo: TransactionData) {
        try {
            this.validateTransactionData(transactionInfo);
        }catch(error) {
            throw error;
        }
        const { originAccountNumber, destinyAccountNumber, transferredAmount }  = transactionInfo;
        const transactionObject = new Transaction(originAccountNumber, destinyAccountNumber, transferredAmount);
        return transactionObject;
    }
}

export default TransactionBuildObject;
