
import awaitToJs from 'await-to-js';
import { CustomerAccountRepository } from '../Repositories';


class CustomerAccountUpdateBalance {
   static async updateBalance(account: ICustomerAccount) {
        const balance = account.getBalance();
        const accountNumber = account.getAccountNumber();
        const balanceToUpdate = { balance };
        const where = { accountNumber };
        const [error, update] = await awaitToJs(CustomerAccountRepository.updateCustomerAccount(where, balanceToUpdate));
        if (error) {
            throw error;
        }
        return update[0];
    }
}

export default CustomerAccountUpdateBalance;
