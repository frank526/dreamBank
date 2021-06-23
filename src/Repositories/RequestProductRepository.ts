import awaitToJs from 'await-to-js';
import db from '../DBConnection';
import { RequestedBankProduct } from '../Entities';

class RequestProductRepository {
    static async createRequestedProduct(requestedBankProductData: RequestedBankProduct) {
       const [error, requestedProduct] = await awaitToJs(db.RequestedBankProduct.create(requestedBankProductData));
       if(error) {
           throw error;
       }
       return requestedProduct;
    }
}
export default RequestProductRepository;
