import awaitToJs from 'await-to-js';
import db from '../DBConnection';

class CustomerAccountRetrieve implements ICustomerAccountRepositoryRetrieve {
    private where: CustommerAccountWhere;
    constructor(where: CustommerAccountWhere) {
        this.where = where;
    } 
    async getCustomerAccount(attributes?:string[]){
        const where = this.where;
        const [error, account] = await awaitToJs(
            db.CustomerAccount.findOne({ attributes, where, raw: true})) as CustomerAccountData[];
        if(error) {
            throw error;
        }
        return account;
    }
}

export default CustomerAccountRetrieve;
