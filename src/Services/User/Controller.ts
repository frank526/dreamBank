import config from '../../config';
import awaitToJs from 'await-to-js';
import { UserCreateProcess, UserAuthProcess } from '../../User';

const { 
    STATUS_CODE_400,
    STATUS_CODE_201, 
    STATUS_CODE_200,
} = config;

const createUser: Middleware = async(req, res) => {
    if(!req.body || !req.body.user) {
         const error = 'User Data is required';
        return res.status(STATUS_CODE_400).send(error);
    }
    const { firstName, lastName, identificationCard, password  } = req.body.user;
    const userCreateProcess = new UserCreateProcess();
    const [error, user] = await awaitToJs(userCreateProcess.createUser(firstName, lastName, identificationCard, password));

    if(error) {
        console.log('error  ',error);
       return res.status(STATUS_CODE_400).send(error);
    }
    return res.status(STATUS_CODE_201).json({ User: user });
}

const login: Middleware = async(req, res) => {
    if (!req.query) {
        const error = 'Invalid Params';
        return res.status(STATUS_CODE_400).send(error);
    }
    const password = req.query.password as string;
    const identificationCard = req.query.identificationCard as string;

    const authProcess = new UserAuthProcess();
    const [error, token] = await awaitToJs(authProcess.authentication(identificationCard, password));

    if(error){
        console.log('error  ',error);
        return res.status(STATUS_CODE_400).send(error);
    }
    return res.status(STATUS_CODE_200).json({ token });
}

export {
    createUser,
    login,
};
