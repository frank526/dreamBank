import awaitToJs from 'await-to-js';
import UserValidation from './UserValidation';
import { UserStorageRetrieve } from '../Storage/User';
import UserValidateCredentials from './UserValidateCredentials';
import UserAuthTokenProcess from './UserAuthTokenProcess';

class UserAuthProcess implements IUserAuthentication, IUserValidateToken {
    private userValidateIdPassword: IUserValidationIdentificationPassword;
    private userStorageRetrieve: IUserStorageRetrieve;
    private userValidateCredentials: IUserValidationCredentials;
    private userAuthTokenProcess: IUserAuthTokenGenerateToken;
    private userDecodedToken: IUserDecodedToken;

    constructor() {
        this.userValidateIdPassword = new UserValidation();
        this.userStorageRetrieve = new UserStorageRetrieve();
        this.userValidateCredentials = new UserValidateCredentials();
        this.userAuthTokenProcess = new UserAuthTokenProcess();
        this.userDecodedToken = new UserAuthTokenProcess();
    }

    async authentication(identificationCard: string, password: string) {
        this.userValidateIdPassword = new UserValidation();
        try {
            this.userValidateIdPassword.validateIdentificactionPassword(identificationCard, password);
        } catch (error) {
            throw error;
        }

        const [error, validate] = await awaitToJs(this.userValidateCredentials.validateCredentials(identificationCard, password));
        if (error) {
            throw error;
        }
        if (!validate) {
            throw 'User Credentials is incorrect';
        }
        const [error2, user] = await awaitToJs(this.userStorageRetrieve.getUser({ identificationCard }, ['id', 'identificationCard'])) as IUserTokenData[];

        if (error2) {
            throw error2;
        }
        user.password = password;
        const token = this.userAuthTokenProcess.generateToken(user);
        return token;
    }

    async validateToken(token: string) {
        
       const decodedToken = this.userDecodedToken.decodedToken(token) as IUserTokenData;

    console.log('decodedToken ',decodedToken);
       if(!decodedToken) {
           throw 'Invalid Token';
       }
       const { identificationCard, password } = decodedToken;
       const [error, validate] = await awaitToJs(this.userValidateCredentials.validateCredentials(identificationCard, password));
        if (error) {
            throw error;
        }
        if(!validate) {
            throw 'Invalid Token';
        }
        return decodedToken;
    }

}

export default UserAuthProcess;
