import awaitToJs from 'await-to-js';
import { UserDBCreate }  from '../../DB/User';

class UserStorageCreate implements IUserStorageCreate {
    private userStorageCreate: IUserDBCreate;
    constructor() {
        this.userStorageCreate = new UserDBCreate();
    }

    async create(userData: IUser) {
        const [error, user] = await awaitToJs(this.userStorageCreate.create(userData));
        if (error) {
            throw error;
        }
        return user;
    }
}

export default UserStorageCreate;
