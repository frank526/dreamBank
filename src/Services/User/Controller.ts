import joi from 'joi';
import config from '../../config';
import db from '../../DBConnection';
import awaitToJs from 'await-to-js';
import bcrypt from 'bcrypt';
import { 
    UserAuthManager, 
    AuthTokenManager,
 } from '../../Managers';

const { 
    STATUS_CODE_400,
    STATUS_CODE_500,
    STATUS_CODE_201, 
} = config;

const validateUserPayload = (userData: UserData, requiredFields: string[]) => {
    const objectSchema = {
        firstName: joi.string(),
        lastName: joi.string(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),
        identificationCard: joi.string().alphanum(),
    };

    requiredFields.forEach((field)=>{
        objectSchema[field] = objectSchema[field].required();
    });

    const schema = joi.object(objectSchema);
    const validate = schema.validate(userData);
    if(validate.error){
        throw validate.error;
    }
}

const validateUserInfo: MiddlewareNext = (req, res, next) => {
    let error;
    if(!req.body || !req.body.user) {
         error = 'User Data is required';
        return res.status(STATUS_CODE_400).send(error);
    }
    const requiredFields = ['firstName', 'lastName', 'password', 'identificationCard'];
    try {
        validateUserPayload(req.body.user, requiredFields);
    } catch(e) {
        error = `User Data is invalid ${e}`;
        return res.status(STATUS_CODE_400).send(error);
    }
   return next();
}

const validateIdentification: MiddlewareNext = async(req, res, next) => {
    const { identificationCard } = req.body.user;
    const [error, user] = await awaitToJs(db.User.findOne({ where:{ identificationCard }, raw: true })); 
    if (error) {
        return res.status(STATUS_CODE_500).send(error);
    }
    if(user){
        const msg = `There is already a user with identification ${identificationCard}`;
        return res.status(STATUS_CODE_400).send(msg);
    }
    return next();
}

const encryptPassword: MiddlewareNext = async(req, res, next)=>{
    const { password } = req.body.user;
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    req.body.user.password = passwordEncrypted;
    return next();
}

const registerUser: Middleware = async(req, res) => {
  const [error, newUser] = await awaitToJs(db.User.create(req.body.user));
  if(error) {
    return res.status(STATUS_CODE_500).send(error);
  }
  return res.status(STATUS_CODE_201,).json({user: newUser.toJSON() });
}

const validateLoginRequest: MiddlewareNext = async(req, res, next) => {
    if (!req.query) {
        const error = `invalid params`;
        return res.status(STATUS_CODE_400).send(error);
    }

    if(!req.query.password || !req.query.identificationCard) {
        return res.status(STATUS_CODE_400).send('Empty params');
    }
    return next();
}

const validateUserCredentials: MiddlewareNext = async (req, res, next) => {
    const password = req.query.password as string;
    const identificationCard = req.query.identificationCard as string;
    const userCredentials = { password, identificationCard };

    const [error, validation] = await awaitToJs(UserAuthManager.validateCredentials(userCredentials));

    if (error) {
        return res.status(STATUS_CODE_400).send(`User authenticacion failed ${error}`);
    }

    if (!validation) {
        return res.status(STATUS_CODE_400).send('User Credentials is incorrect');
    }
    req.body = { userCredentials: { password, identificationCard } };
    return next();
}

const generateToken: Middleware = async (req, res) => {
    const { userCredentials } = req.body;
    const token = AuthTokenManager.generateToken(userCredentials);
    return res.json({ token });
}

export {
    validateUserInfo,
    registerUser,
    validateIdentification,
    encryptPassword,
    validateUserCredentials,
    generateToken,
    validateLoginRequest,
};
