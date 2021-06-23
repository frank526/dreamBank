import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class CustomerAccountDBRetrieve implements ICustomerAccountDBRetrieve { 
    async getCustomerAccount(where: CustomerAccountWhere, attributes?:string[]){
        const [error, account] = await awaitToJs(
            db.CustomerAccount.findOne({ attributes, where, raw: true})) as CustomerAccountData[];
        if(error) {
            throw error;
        }
        return account;
    }
}

export default CustomerAccountDBRetrieve;
