import { CustomerAccountRepositoryUpdate } from '../Repositories';
import awaitToJs from 'await-to-js';

class CustomerAccountTransactionUpdateBalance implements IBankProductUpdateBalance {
    private accountRepositoryUpdate: CustomerAccountRepositoryUpdate;
    constructor() {
        this.accountRepositoryUpdate = new CustomerAccountRepositoryUpdate();
    }

    async updateBalance(customerAccount: IBankProductGetBalanceGetId){
        const balance = customerAccount.getBalance();
        const id = customerAccount.getId();
        const balanceToUpdate = { balance };
        const where = { id };
        const [error, update] = await awaitToJs(this.accountRepositoryUpdate.updateCustomerAccount(balanceToUpdate, where));
        if(error) {
            throw error;
        }
        if(!update) {
            throw 'no update';
        }
    }
}

export default CustomerAccountTransactionUpdateBalance;
