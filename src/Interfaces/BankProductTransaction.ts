interface IBankProductExecuteTransaction {
     executeTransaction(transactionData);
}

interface ITransactionRegister {
    createTransaction(transactionData)
}



interface IBankProductTransaction {
    validateData()
}

interface ITransactionValidation {
    executeTransactionValidation(IBankProductTransaction:IBankProductTransaction)
}

