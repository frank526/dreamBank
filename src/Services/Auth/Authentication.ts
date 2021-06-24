import awaitToJs from 'await-to-js';
import config from '../../config';
import {UserAuthProcess} from '../../User';

const { 
    STATUS_CODE_401,
} = config;

const authentication: MiddlewareNext = async (req, res, next) => {
    const token = req.get('x-api-token');
    if (!token) {
        return res.status(STATUS_CODE_401).send('Auth token header not found');
    }
    const authProcess: IUserValidateToken  = new UserAuthProcess();
    const [error, decodedToken] =  await awaitToJs(authProcess.validateToken(token));
    if(error){
        return res.status(STATUS_CODE_401).send('Invalid Token');
    }

    if (!decodedToken) {
        return res.status(STATUS_CODE_401).send('Invalid Token');
    }
    if(req.body) {
        req.body.userData = decodedToken;
    }
    return next();
}

export default authentication;
