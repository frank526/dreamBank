
interface ICustomerAccount {
    getBalance(): number;
    getAccountNumber(): string;
}

interface ICustomerAccountUpdateDB{
    update(accountData, where);
}

interface ICustomerAccountRepositoryRetrieve {
    getCustomerAccount(attributes?:string[])
}

interface IGetAccountNumber {
    getAccountNumber(): string;
}




