import awaitToJs from 'await-to-js';
import UserValidation from './UserValidation';
import UserValidateIdentification from './UserValidateIdentification';
import PasswordEncrypt from './UserEncryptPassword';
import { UserStorageCreate } from '../Storage/User';
import { User } from '../Entities';

class UserCreateProcess {
    private userValidation: IUserGeneralValidationData;
    private userValidateIdentification: IUserValidationIdentification;
    private userPasswordEncrypt: IUserPasswordEncrypt;
    private userStorageCreate: IUserStorageCreate;

    constructor() {
        this.userValidateIdentification = new UserValidateIdentification();
        this.userPasswordEncrypt = new PasswordEncrypt();
        this.userStorageCreate = new UserStorageCreate();
        this.userValidation = new UserValidation();
    }


    async createUser(firstName: string, lastName: string, identificationCard: string, password: string) {
        try {
            this.userValidation.validationGeneralData(firstName, lastName, identificationCard, password);
        } catch (error) {
            throw error;
        }

        try {
            await this.userValidateIdentification.validateIdentification(identificationCard);
        } catch (error) {
            throw error;
        }

        const passwordEncrypted = this.userPasswordEncrypt.encrypt(password);
        const user = new User(firstName, lastName, passwordEncrypted, identificationCard);
        const [error, userCreated] = await awaitToJs(this.userStorageCreate.create(user));

        if(error) {
            throw error;
        }
        return userCreated;

    }
}

export default UserCreateProcess;
