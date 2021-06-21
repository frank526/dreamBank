import awaitToJs from 'await-to-js';
import CustomerAccountUpdateDB from './CustomerAccountUpdateDB';

class CustomerAccountRepositoryUpdate {
    private customerAccountRepository: ICustomerAccountUpdateDB;
    constructor() {
        this.customerAccountRepository = new CustomerAccountUpdateDB();
    }

    async updateCustomerAccount(accountData: CustomerAccountData, where: CustommerAccountWhere) {
        const [error, update] = await awaitToJs(this.customerAccountRepository.update(accountData, where));
        if (error) {
            throw error;
        }
        return update;
    }
}

export default CustomerAccountRepositoryUpdate;
