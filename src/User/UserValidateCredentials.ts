import awaitToJs from 'await-to-js';
import UserEncryptPassword from './UserEncryptPassword';
import { UserStorageRetrieve } from '../Storage/User';

class UserValidationCredentials implements IUserValidationCredentials {
    private userStorageRetrieve: IUserStorageRetrieve;
    private userEncryptPassword: IUserComparePassword;

    constructor() {
        this.userStorageRetrieve = new UserStorageRetrieve();
        this.userEncryptPassword = new UserEncryptPassword();
    }

    async validateCredentials(identificationCard: string, password: string) {
        const [error, user] = await awaitToJs(this.userStorageRetrieve.getUser({ identificationCard },['password'])) as UserData[];
        if(error) {
            throw error;
        }
        if(!user) {
            throw 'User not found';
        }
        const [error2, validate] = await awaitToJs(this.userEncryptPassword.comparePassword(password, user.password));
        if(error2) {
            throw error2;
        }
        return validate;
    }
}

export default UserValidationCredentials;
