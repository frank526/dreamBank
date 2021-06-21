import { CustomerAccount } from '../Classes/index';

declare global {

    type accountTransactionDataObj = {
        originBankProduct: IBankProductTransfer,
        destinyBankProduct: IBankProductEnterAmount,
        amount: number;
    }

}