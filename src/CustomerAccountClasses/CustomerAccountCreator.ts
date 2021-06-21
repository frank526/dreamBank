import { CustomerAccount } from '../Classes';

class CustomerAccountCreator implements IBankProductCreator {
    createBankProduct(customerAccountData: CustomerAccountData) {
        const { accountNumber, customerFirstName, customerLastName, balance } = customerAccountData;
        const account = new CustomerAccount(accountNumber, customerFirstName, customerLastName, balance);
        return account;
    }
}

export default CustomerAccountCreator;
