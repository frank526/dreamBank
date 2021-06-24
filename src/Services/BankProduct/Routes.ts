import express from 'express';
import * as bodyParser from 'body-parser';
import authentication from '../Auth/Authentication';
import { 
    registerRequestedBankProduct,
 } from './Controller';

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/bankproduct',
    jsonParser,
    authentication,
    registerRequestedBankProduct,
);



export default router;
