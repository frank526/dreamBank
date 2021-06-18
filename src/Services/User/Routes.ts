import express from 'express';
import * as bodyParser from 'body-parser';

import { 
    validateUserInfo, 
    validateIdentification, 
    encryptPassword,
    registerUser,
    validateUserCredentials,
    generateToken,
    validateLoginRequest,
 } from './Controller';

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/user', 
jsonParser, 
validateUserInfo,  
validateIdentification, 
encryptPassword, 
registerUser);

router.get('/login',
validateLoginRequest,
validateUserCredentials,
generateToken,
);

export default router;
 