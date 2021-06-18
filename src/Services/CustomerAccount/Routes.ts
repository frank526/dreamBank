import express from 'express';
const router = express.Router();
import { 
    getCustomerAccountList,
 } from './Controller';



router.get('/customeraccount',
getCustomerAccountList,
);

export default router;


