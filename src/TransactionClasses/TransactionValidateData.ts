class AccountTransactionValidation implements ITransactionValidation {
    executeTransactionValidation(accountTransaction: IBankProductTransaction) {
        try {
            accountTransaction.validateData();
        } catch (error) {
            throw error;
        }
    }
}

export default AccountTransactionValidation;
