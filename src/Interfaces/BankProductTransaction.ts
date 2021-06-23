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

 

