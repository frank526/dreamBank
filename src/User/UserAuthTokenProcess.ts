import jwt from 'jsonwebtoken';
import config from '../config';
const { TOKEN_SECRET } = config;

class UserAuthTokenProcess implements IUserAuthTokenGenerateToken, IUserDecodedToken {
    generateToken(userData: IUserTokenData) {
        const token = jwt.sign(userData, config.TOKEN_SECRET, { expiresIn: '1h' });
        return token;
    }
    decodedToken(token: string) {
        let decodedToken: IUserTokenData;
        try {
            decodedToken = jwt.verify(token, TOKEN_SECRET) as IUserTokenData;
        } catch (error) {
            throw error;
        }
        if (!decodedToken.id || !decodedToken.identificationCard || !decodedToken.password) {
            throw 'Invalid Token';
        }
        return decodedToken;
    }
}

export default UserAuthTokenProcess;

