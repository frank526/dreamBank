import awaitToJs from 'await-to-js';
import bcrypt from 'bcrypt';

class PasswordEncrypt implements IUserPasswordEncrypt, IUserComparePassword {
    encrypt(password: string) {
        const passwordEncrypted = bcrypt.hashSync(password, 10);
        return passwordEncrypted;
    }

    async comparePassword(passwordPlainText: string, passwordHash: string) {
        const [error, validation] = await awaitToJs(bcrypt.compare(passwordPlainText, passwordHash));
        if (error) {
            throw error;
        }
        return validation;
    }
}

export default PasswordEncrypt;
