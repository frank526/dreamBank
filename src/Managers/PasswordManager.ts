import bcrypt from 'bcrypt';
import awaitToJs from 'await-to-js';

class PasswordManager {
    static async comparePassword(passwordPlainText: string, passwordHash: string){
      const [error, validation] = await awaitToJs(bcrypt.compare(passwordPlainText, passwordHash));
      if(error){
          throw error;
      }
      return validation;
    }
}

export default PasswordManager;