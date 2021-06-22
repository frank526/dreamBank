interface IBankProductExecuteTransaction {
     executeTransaction(transactionData);
}


interface IBankProductTransaction {
    validateData()
}

interface ITransactionValidation {
    executeTransactionValidation(IBankProductTransaction:IBankProductTransaction)
}

interface ITransactionCreateDB {
    create(transactionData)
}

interface ITransactionRegister {
    registerTransaction(originBankProduct: IGetAccountNumber, destinyBankProduct: IGetAccountNumber, amount: number, description:string);
}

 

