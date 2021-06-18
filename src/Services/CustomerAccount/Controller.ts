import awaitToJs from 'await-to-js';
import config from '../../config';
import {
    UserAuthManager,
    AuthTokenManager,
    RequestedBankProductManager,
    CustomerAccountManager,
    TransactionManager,
 } from '../../Managers';

 import { TransactionRepository } from '../../Repositories';

const { 
    STATUS_CODE_401,
    STATUS_CODE_400,
    STATUS_CODE_201,
    STATUS_CODE_500,
} = config;

const getCustomerAccountList: Middleware = async(req, res) => {
    if(!req.query || !req.query.userId) {
        const error = 'User ID is required';
        return res.status(STATUS_CODE_500).send(error);
    }
    const userId  = req.query.userId as string;
    const [error, accountList] = await awaitToJs(CustomerAccountManager.getAllCustomerAccount(userId));
    if(error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return res.json({ customerAccountList: accountList });
}

export {
    getCustomerAccountList,
};