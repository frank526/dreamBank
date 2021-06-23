import { CustomerAccount } from '../Entities';

class CustomerAccountCreator implements IBankProductCreator {
    createBankProduct(customerAccountData: CustomerAccountData) {
        const { accountNumber, customerFirstName, customerLastName, balance, id } = customerAccountData;
        const account = new CustomerAccount(accountNumber, customerFirstName, customerLastName, balance, id);
        return account;
    }
}

export default CustomerAccountCreator;
