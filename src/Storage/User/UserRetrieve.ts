import awaitToJs from 'await-to-js';
import { UserDBRetrieve }  from '../../DB/User';

class UserStorageRetrieve implements IUserStorageRetrieve {
    private customerAccountStorageRetrieve: IUserDBRetrieve;
    constructor() {
        this.customerAccountStorageRetrieve = new UserDBRetrieve();
    }

    async getUser(where: CustomerAccountWhere, attributes?: string[]) {
        const [error, account] = await awaitToJs(this.customerAccountStorageRetrieve.getUser(where, attributes));
        if (error) {
            throw error;
        }
        return account;
    }
}

export default UserStorageRetrieve;
