import awaitToJs from 'await-to-js';
import { CustomerAccountDBRetrieve }  from '../../DB/CustomerAccount';

class CustomerAccountRetrieve implements ICustomerAccountStorageRetrieve {
    private customerAccountStorageRetrieve: ICustomerAccountDBRetrieve;
    constructor() {
        this.customerAccountStorageRetrieve = new CustomerAccountDBRetrieve();
    }

    async getCustomerAccount(where: CustomerAccountWhere, attributes?: string[]) {
        const [error, account] = await awaitToJs(this.customerAccountStorageRetrieve.getCustomerAccount(where, attributes));
        if (error) {
            throw error;
        }
        return account;
    }
}

export default CustomerAccountRetrieve;
