import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class CustomerAccountListDBRetrieve implements ICustomerAccountListDBRetrieve { 
    async getCustomerAccountList(where: CustomerAccountWhere, attributes?:string[]){
        const [error, account] = await awaitToJs(
            db.CustomerAccount.findAll({ attributes, where, raw: true})) as CustomerAccountData[];
        if(error) {
            throw error;
        }
        return account;
    }
}

export default CustomerAccountListDBRetrieve;
