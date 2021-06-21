class AccountTransactionProcess implements IBankProductExecuteTransaction {
    private originBankProduct: IBankProductTransfer;
    private destinyBankProduct: IBankProductEnterAmount;
    private amount: number;

    constructor(originBankProduct: IBankProductTransfer, destinyBankProduct:IBankProductEnterAmount, amount:number){
        this.originBankProduct = originBankProduct;
        this.destinyBankProduct = destinyBankProduct;
        this.amount = amount;
    }

     executeTransaction() {
        try {
            this.originBankProduct.toTransfer(this.destinyBankProduct, this.amount);
        } catch(error) {
            throw error;
        }
    }
}

export default AccountTransactionProcess;
