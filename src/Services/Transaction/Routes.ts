import express from 'express';
import * as bodyParser from 'body-parser';
import { authentication } from '../BankProduct/Controller';

import {
    validateTransaction,
    executeTransaction,
   // registerTransactionInfo,
   // getTransactionList,
} from './Controller';

const jsonParser = bodyParser.json();
const router = express.Router();


router.post('/transaction',
    jsonParser,
    authentication,
    validateTransaction,
    executeTransaction,
   // registerTransactionInfo,
);



export default router;
