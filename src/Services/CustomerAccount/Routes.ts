import express from 'express';
// import { authentication } from '../BankProduct/Controller';

import authentication from '../Auth/Authentication';
const router = express.Router();

import { 
    getCustomerAccountList,
 } from './Controller';

router.get('/customeraccount',
    authentication,
    getCustomerAccountList,
);

export default router;
