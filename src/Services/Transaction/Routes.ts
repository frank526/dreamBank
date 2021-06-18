import express from 'express';
import * as bodyParser from 'body-parser';
import { authentication } from '../BankProduct/Controller';

import {
    generateTransaction,
    getTransactionList,
} from './Controller';

const jsonParser = bodyParser.json();
const router = express.Router();


router.post('/transaction',
    jsonParser,
    authentication,
    generateTransaction,
);

router.get('/transactions',
    authentication,
    getTransactionList,
);

export default router;
