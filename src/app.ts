import { Express } from 'express';
import routerUser from './Services/User/Routes';
import routerProduct from './Services/BankProduct/Routes';
import routerAccount from './Services/CustomerAccount/Routes';
import routerTransaction from './Services/Transaction/Routes';

export default (app: Express) => {
    app.use('/api', routerUser);
    app.use('/api', routerProduct);
    app.use('/api', routerAccount),
    app.use('/api', routerTransaction)
}
