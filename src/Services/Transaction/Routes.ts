import express from 'express';
import * as bodyParser from 'body-parser';
// import { authentication } from '../BankProduct/Controller';

import authentication from '../Auth/Authentication';


import {
    validateTransaction,
    executeTransaction,
    getTransactionList,
    getTransactionDetail,
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

router.get('/transactions',
    authentication,
    getTransactionList,
);

router.get('/transaction',
    authentication,
    getTransactionDetail,
);


export default router;
