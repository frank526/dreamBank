
interface ICustomerAccount {
    getBalance(): number;
    getAccountNumber(): string;
}

interface ICustomerAccountUpdateDB{
    update(accountData, where);
}

interface ICustomerAccountDBRetrieve {
    getCustomerAccount(where: CustomerAccountWhere, attributes?:string[])
}

interface ICustomerAccountStorageRetrieve {
    getCustomerAccount(where: CustomerAccountWhere, attributes?:string[])
}

interface IGetAccountNumber {
    getAccountNumber(): string;
}




