import awaitToJs from 'await-to-js';
import config from '../../config';
import {
    RequestedBankProductManager,
 } from '../../Managers';

const { 
    STATUS_CODE_400,
    STATUS_CODE_201,
} = config;

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
    registerRequestedBankProduct,
};
