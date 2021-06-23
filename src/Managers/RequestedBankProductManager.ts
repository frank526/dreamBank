import awaitToJs from 'await-to-js';
import { RequestedBankProduct } from '../Entities';
import { 
    RequestProductRepository, 
    UserRepository,
 } from '../Repositories';

class RequestedBankProductManager {

    static async createRequestProductProcess(requestData: RequestedBankProductPayLoad) {
        try {
            this.validateRequestProductData(requestData);
        } catch (error) {
            throw error;
        }
        const { userIdentifiacion, productBank } = requestData;
        const userQueryFilter = { identificationCard: userIdentifiacion };
        const [error, foundUser] = await awaitToJs(UserRepository.getUser(['id'], userQueryFilter));

        if (error) {
            throw `Error processing Create Request Product ${error}`;
        }
        const { id } = foundUser;
        const requestBankProduct = new RequestedBankProduct(id, productBank, 'Pending');
        const [createError, requestedBankProdObj] = await awaitToJs(
            RequestProductRepository.createRequestedProduct(requestBankProduct));

        if (createError) {
            throw `Error creating Requested Bank Product`;
        }
        return requestedBankProdObj;
    }

    static validateRequestProductData(requestData: RequestedBankProductPayLoad) {
        if (!requestData) {
            throw 'Request Bank Product is empty';
        }
        const { userIdentifiacion, productBank } = requestData;
        if (!userIdentifiacion) {
            throw 'User Identification is required';
        }

        if (!productBank) {
            throw 'Request Product Bank is required';
        }
    }
}

export default RequestedBankProductManager;
