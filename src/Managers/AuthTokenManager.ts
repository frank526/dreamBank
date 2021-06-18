import jwt from 'jsonwebtoken';
import config from '../config';
const { TOKEN_SECRET } = config;

class AuthTokenManager {
   static generateToken(userData: UserData){
       const token = jwt.sign(userData, config.TOKEN_SECRET, {expiresIn: '1h'});
       return token;
    }

   static decodedToken(token: string) {
        let decodedToken: UserData;
        try {
            decodedToken = jwt.verify(token, TOKEN_SECRET) as UserData;
        } catch (error) {
            throw error;
        }

        if(!decodedToken.password || !decodedToken.identificationCard) {
            throw 'Invalid Token';
        }
        
        return decodedToken;
    }
}

export default AuthTokenManager;
