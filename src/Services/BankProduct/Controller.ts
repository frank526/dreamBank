import awaitToJs from 'await-to-js';
import config from '../../config';
import {
    UserAuthManager,
    AuthTokenManager,
    RequestedBankProductManager,
 } from '../../Managers';

const { 
    STATUS_CODE_401,
    STATUS_CODE_400,
    STATUS_CODE_201,
} = config;

const authentication: MiddlewareNext = async(req, res, next)=>{
    const token = req.get('x-api-token');
    if(!token){
        return res.status(STATUS_CODE_401).send('Auth token header not found');
    }
    let decodedToken;
    try {
        decodedToken = AuthTokenManager.decodedToken(token);
    } catch(error) {
        return res.status(STATUS_CODE_401).send(`Auth token Invalid ${error}`);
    }
   const [error, validation] =  await awaitToJs(UserAuthManager.validateCredentials(decodedToken));

   if(error) {
       return res.status(STATUS_CODE_401).send(`Auth token Invalid ${error}`);
   }
   if(!validation) {
       return res.status(STATUS_CODE_401).send('Auth token Invalid');
   }

    if (req.body) {
        req.body.userData = decodedToken;
    } else {
        req.body = { userData: decodedToken };
    }

   return next();
}

const registerRequestedBankProduct: Middleware = async (req, res) => {
    if(!req.body || !req.body.requestedBankProduct){
        return res.status(STATUS_CODE_400).send('Requested Bank Product required params');
    }
    const { productBank } = req.body.requestedBankProduct;
    const { identificationCard } = req.body.userData;

    const requestData = {
        productBank,
        userIdentifiacion: identificationCard,
    };

  const [error, requestedBankProd] = await awaitToJs(RequestedBankProductManager.createRequestProductProcess(requestData));

  if(error) {
    return res.status(STATUS_CODE_400).send(error);
  }
  return res.status(STATUS_CODE_201,).json({ productBank: requestedBankProd.toJSON() });
}

export {
    authentication,
    registerRequestedBankProduct,
};
