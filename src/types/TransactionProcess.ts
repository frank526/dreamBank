import { CustomerAccount } from '../Entities/index';

declare global {

    type accountTransactionDataObj = {
        originBankProduct: IBankProductTransfer,
        destinyBankProduct: IBankProductEnterAmount,
        amount: number;
    }

}