import awaitToJs from 'await-to-js';
import db from '../DBConnection';

class CustomerAccountRepository {
    static async getCustomerAccountList(userId:number){
       const [error, accountList] = await awaitToJs(
           db.CustomerAccount.findAll({ where:{ userId }, raw: true})) as CustomerAccountData[][];
       if(error) {
           throw error;
       }
       return accountList;
    }
    static async getCustomerAccount(where:any){
        const [error, account] = await awaitToJs(
            db.CustomerAccount.findOne({ where, raw: true})) as CustomerAccountData[];
        if(error) {
            throw error;
        }
        return account;
     }

     static async updateCustomerAccount( where:any, customerAccount: CustomerAccountData ) {
        const [error, update] = await awaitToJs(db.CustomerAccount.update(customerAccount,{ where }));
        if(error) {
            throw error;
        }
        return update;
     }
}

export default CustomerAccountRepository;
