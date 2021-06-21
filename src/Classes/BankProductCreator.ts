
class BankProductCreator {
    private bankProductCreator: IBankProductCreator;
    constructor(bankProductCreator: IBankProductCreator) {
        this.bankProductCreator = bankProductCreator;
    }
    executeCreator(bankProductData){
       const bankProduct = this.bankProductCreator.createBankProduct(bankProductData);
       return bankProduct;
    }
}

export default BankProductCreator;