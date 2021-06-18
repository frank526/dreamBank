import awaitToJs from 'await-to-js';
import UserRepository from '../Repositories/UserRepository';
import PasswordManager from './PasswordManager';

class UserAuth {
    static async validateCredentials(userCredentials: UserData){
        if(!userCredentials || !userCredentials.password || !userCredentials.identificationCard) {
            throw 'User Credentials not found';
        }
        const { password, identificationCard } = userCredentials;
        const [error, userInfo] = await awaitToJs(UserRepository.getUser(['password'], { identificationCard }));
        if(error){
            throw `Error getting User Data ${error}`;
        }

        if(!userInfo){
            throw 'User not found';
        }

       const [error2, validation] = await awaitToJs(PasswordManager.comparePassword(password,  userInfo.password)); 

       if(error2){
           throw `Èrror validate password ${error2}`;
       }
       return validation;
    }
}

export default UserAuth;
