import awaitToJs from 'await-to-js';
import { UserStorageRetrieve } from '../Storage/User';


class UserValidateIdentification implements IUserValidationIdentification {
    private userStorageRetrieve: IUserStorageRetrieve;

    async validateIdentification(identificationCard: string){
        this.userStorageRetrieve = new UserStorageRetrieve();
        const where = { identificationCard };
        const [error, user] = await awaitToJs(this.userStorageRetrieve.getUser(where, ['identificationCard'])) as UserData[];
        if(error) {
            throw error;
        }

        if(user && user.identificationCard === identificationCard) {
            throw `There is already a user with identification ${identificationCard}`;
        }
    }
}

export default UserValidateIdentification;
