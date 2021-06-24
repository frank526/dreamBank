import awaitToJs from 'await-to-js';
import { CustomerAccountListDBRetrieve }  from '../../DB/CustomerAccount';

class CustomerAccountListStorageRetrieve implements ICustomerAccountListStorageRetrieve {
    private customerAccountListStorageRetrieve: ICustomerAccountListStorageRetrieve;
    constructor() {
        this.customerAccountListStorageRetrieve = new CustomerAccountListDBRetrieve();
    }

    async getCustomerAccountList(where: CustomerAccountWhere, attributes?:string[]){
        const [error, accountList] = await awaitToJs(
            this.customerAccountListStorageRetrieve.getCustomerAccountList(where, attributes)) as CustomerAccountData[][];
        if(error) {
            throw error;
        }
        return accountList;
    }
}
export default CustomerAccountListStorageRetrieve;
