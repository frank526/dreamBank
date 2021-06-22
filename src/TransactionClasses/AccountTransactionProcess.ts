import awaitToJs from 'await-to-js';
import CustomerAccountTransactionUpdateBalance from '../Classes/CustomerAccountTransactionUpdateBalance';

class AccountTransactionProcess implements IBankProductExecuteTransaction {
    private originBankProduct: IBankProductTransfer;
    private destinyBankProduct: IBankProductEnterAmount;
    private bankProductUpdateBalance: IBankProductUpdateBalance;
    private amount: number;
    private description: string;

    constructor(originBankProduct: IBankProductTransfer, destinyBankProduct:IBankProductEnterAmount, amount:number, description: string){
        this.originBankProduct = originBankProduct;
        this.destinyBankProduct = destinyBankProduct;
        this.amount = amount;
        this.bankProductUpdateBalance = new CustomerAccountTransactionUpdateBalance();
        this.description = description;
    }

     async executeTransaction() {
        try {
            this.originBankProduct.toTransfer(this.destinyBankProduct, this.amount);
        } catch(error) {
            throw error;
        }

        const [error1] = await awaitToJs(this.bankProductUpdateBalance.updateBalance(this.originBankProduct));

        if(error1) {
            throw error1;
        }

        const [error2] = await awaitToJs(this.bankProductUpdateBalance.updateBalance(this.destinyBankProduct));
        if(error2) {
            throw error2;
        }

        




    }
}

export default AccountTransactionProcess;
