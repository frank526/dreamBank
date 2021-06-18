import { CustomerAccount } from '../Classes';

class CustomerAccountBuildObject {
   private static validateAccountData(accountInfo: CustomerAccountData){
        if(!accountInfo) {
            throw 'Customer Account is undefined';
        }
        const { accountNumber, balance, customerFirstName, customerLastName } = accountInfo;

        if(!accountNumber) {
            throw 'Account Number is undefined';
        }
        if(balance === undefined || balance === null) {
            throw 'Account Balance is undefined or null';
        }
        if(!customerFirstName) {
            throw 'CustomerFirstName is undefined';
        }
        if(!customerLastName) {
            throw 'CustomerLastName is undefined';
        }
    };
   static getAccountObject(accountInfo: CustomerAccountData) {
        try {
            this.validateAccountData(accountInfo);
        }catch(error) {
            throw error;
        }
        const { accountNumber, balance, customerFirstName, customerLastName } = accountInfo;
        const accountObject = new CustomerAccount(accountNumber, customerFirstName, customerLastName, balance);
        return accountObject;
    }
}

export default CustomerAccountBuildObject;
