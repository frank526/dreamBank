import awaitToJs from 'await-to-js';
import { CustomerAccountRepository } from '../Repositories';

class CustomerAccountManager {
    static async getAllCustomerAccount(userIdStr: string) {
       const userId = Number(userIdStr);
       if(isNaN(userId)){
           throw 'User id should be a number';
       }
       const [error, accountList] = await awaitToJs(CustomerAccountRepository.getCustomerAccountList(userId));
       if(error) {
           throw error;
       }
       return accountList;
    }
}

export default CustomerAccountManager;
