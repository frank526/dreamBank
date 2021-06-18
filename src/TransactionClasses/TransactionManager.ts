import awaitToJs from 'await-to-js';
import { 
    TransactionRepository, 
    CustomerAccountRepository,
 } from '../Repositories';

 import { TransactionBuildObject } from '../TransactionClasses';
 import { CustomerAccountUpdateBalance, CustomerAccountBuildObject }  from '../CustomerAccountClasses'

class TransactionManager {
    static async createTransaction(originAccountNumber: string, destinyAccountNumber: string, amount: number) {
        const filterAccount1 = { accountNumber: originAccountNumber };
        const [error1, account1] = await awaitToJs(CustomerAccountRepository.getCustomerAccount(filterAccount1));
        if (error1) {
            throw error1;
        }

        const filterAccount2 = { accountNumber: destinyAccountNumber };
        const [error2, account2] = await awaitToJs(CustomerAccountRepository.getCustomerAccount(filterAccount2));
        if (error2) {
            throw error2;
        }

        const originAccount = CustomerAccountBuildObject.getAccountObject(account1);
        const destinyAccount = CustomerAccountBuildObject.getAccountObject(account2);

        try {
            this.executeTransaction(originAccount, destinyAccount, amount);
        } catch (error) {
            console.log('error 000 ',error);
            throw error;
        }


        const [error3, update1] = await awaitToJs(CustomerAccountUpdateBalance.updateBalance(originAccount));

        if (error3) {
            throw error3;
        }

        if (!update1) {
            throw 'Account Origin no update';
        }

        const [error4, update2] = await awaitToJs(CustomerAccountUpdateBalance.updateBalance(destinyAccount));

        if (error4) {
            throw error4;
        }

        if (!update2) {
            throw 'Account Destiny no update';
        }

        const transactionData = {
            originAccountNumber: originAccount.getAccountNumber(),
            destinyAccountNumber: destinyAccount.getAccountNumber(),
            transferredAmount: amount,
        }

        const transactionObject = TransactionBuildObject.getTransactionObject(transactionData);
        const [error5, trasnactionCreated] = await awaitToJs(TransactionRepository.createTransaction(transactionObject));

        if (error5) {
            throw error5;
        }

        return trasnactionCreated;
    }

    static executeTransaction(originAccount: ICustomerAccount, destinyAccount: ICustomerAccount, amount: number) {
        try {
            originAccount.toTransfer(destinyAccount, amount);
        } catch (error) {
            throw error;
        }
    }

}
export default TransactionManager;
