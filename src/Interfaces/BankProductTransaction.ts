interface IBankProductExecuteTransaction {
     executeTransaction(transactionData);
}

interface ITransactionStorageCreate {
    create(transactionData: TransactionData);
}

interface IAccountTransactionValidation {
    validateData()
}

interface ITransactionValidation {
    executeTransactionValidation(IBankProductTransaction:IBankProductTransaction)
}

interface ITransactionCreateDB {
    create(transactionData)
}

interface ITransactionRegister {
    registerTransaction(originAccount: IGetAccountNumber, destinyAccount: IGetAccountNumber, amount:number, description: string);
}

interface ITransactionListRetrieveDB {
    getTransactionList(where: TransactionWhere, attributes?:string[]);
}

interface ITransactionStorageListRetrieve {
    getTransactionList(where: TransactionWhere, attributes?:string[])
}

interface ITransactionRetrieveDB {
    getTransaction(where: TransactionWhere, attributes?:string[]);
}

interface ITransactionStorageRetrieve {
    getTransaction(where: TransactionWhere, attributes?:string[]);
}
