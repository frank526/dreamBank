import awaitToJs from 'await-to-js';
import db from '../DBConnection';

class UserRepository {
    static async getUser(attributes: string[], where: any){
       const [error, foundUser] = await awaitToJs(
           db.User.findOne({ attributes, where, raw: true})) as UserData[];
           if(error){
               throw error;
           }
           return foundUser;
    }
}

export default UserRepository;