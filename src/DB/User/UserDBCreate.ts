import awaitToJs from 'await-to-js';
import db from '../../DBConnection';

class UserDBCreate implements IUserDBCreate {
    async create(userData: UserData) {
        const [error, user] = await awaitToJs(db.User.create(userData, {raw:true}));
        if (error) {
            throw error;
        }
        if(!user) {
            throw 'Transaction no created';
        }
        return user.toJSON();
    }
}
 export default UserDBCreate;
