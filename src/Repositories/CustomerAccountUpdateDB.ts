import awaitToJs from 'await-to-js';
import db from '../DBConnection';

class CustomerAccountUpdateDB implements ICustomerAccountUpdateDB{
    async update(accountData: CustomerAccountData, where: CustomerAccountWhere){
        const [error, update] = await awaitToJs(db.CustomerAccount.update(accountData,{ where }));
        if(error) {
            throw error;
        }
        return update[0];
    }
}

export default CustomerAccountUpdateDB;
