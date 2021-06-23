import awaitToJs from 'await-to-js';
import CustomerAccountTransactionUpdateBalance from './CustomerAccountTransactionUpdateBalance';
import TransactionRegister from './TransactionRegister';

class AccountTransactionProcess implements IBankProductExecuteTransaction {
    private originBankProduct: IBankProductOriginTransaction;
    private destinyBankProduct: IBankProductEnterAmount;
    private bankProductUpdateBalance: IBankProductUpdateBalance;
    private amount: number;
    private description: string;
    private transactionRegister: ITransactionRegister;

    constructor(originBankProduct: IBankProductOriginTransaction, destinyBankProduct: IBankProductEnterAmount, amount: number, description: string) {
        this.originBankProduct = originBankProduct;
        this.destinyBankProduct = destinyBankProduct;
        this.amount = amount;
        this.bankProductUpdateBalance = new CustomerAccountTransactionUpdateBalance();
        this.description = description;
        this.transactionRegister = new TransactionRegister();
    }

    async executeTransaction() {
        try {
            this.originBankProduct.toTransfer(this.destinyBankProduct, this.amount);
        } catch (error) {
            throw error;
        }

        const [error1] = await awaitToJs(this.bankProductUpdateBalance.updateBalance(this.originBankProduct));
        if (error1) {
            throw error1;
        }

        const [error2] = await awaitToJs(this.bankProductUpdateBalance.updateBalance(this.destinyBankProduct));
        if (error2) {
            throw error2;
        }

        const [error, transaction] = await awaitToJs(this.transactionRegister.registerTransaction(this.originBankProduct, this.destinyBankProduct, this.amount, this.description));
        if (error) {
            throw error;
        }
        return transaction;
    }
}

export default AccountTransactionProcess;
