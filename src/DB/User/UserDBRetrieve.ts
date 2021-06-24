import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class UserDBRetrieve implements IUserDBRetrieve { 
    async getUser(where: CustomerAccountWhere, attributes?:string[]){
        const [error, user] = await awaitToJs(
            db.User.findOne({ attributes, where, raw: true})) as UserData[];
        if(error) {
            throw error;
        }
        return user;
    }
}

export default UserDBRetrieve;
