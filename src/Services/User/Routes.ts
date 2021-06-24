import express from 'express';
import * as bodyParser from 'body-parser';

import { 
    createUser,
    login,
 } from './Controller';

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/user',
    jsonParser,
    createUser,
);

router.get('/login',
    login
);

export default router;
 