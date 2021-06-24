import awaitToJs from 'await-to-js';
import config from '../../config';
import { CustomerAccountListRetrieve } from '../../Storage/CustomerAccount';
const {
    STATUS_CODE_400,
    STATUS_CODE_500,
} = config;

const getCustomerAccountList: Middleware = async (req, res) => {
    if (!req.query || !req.query.userId) {
        const error = 'User ID is required';
        return res.status(STATUS_CODE_500).send(error);
    }
    const userId = req.query.userId as string;
    const accountListStorage = new CustomerAccountListRetrieve();
    const [error, accountList] = await awaitToJs(accountListStorage.getCustomerAccountList({ userId }));
    if (error) {
        return res.status(STATUS_CODE_400).send(error);
    }
    return res.json({ customerAccountList: accountList });
}

export {
    getCustomerAccountList,
};
