

interface IBankProductEnterAmount extends IBankProductTransaction {
    enterAmount(amount: number): void;
}

interface IBankProductRetractAmount {
    retractAmount(amount: number): void;
}

interface IBankProductGetBalanceGetId extends IObjectId{
    getBalance(): number;
}

interface IBankProductGetBalance {
    getBalance(): number;
}

interface IBankProductUpgradeableBalance {
    getId(): number;
    getBalance(): number;
}

interface IBankProductTransaction {
    getId(): number;
    getBalance(): number;
    getAccountNumber(): string;
}

interface IBankProductOriginTransaction extends IBankProductTransaction{
    toTransfer(destinyBankProduct: IBankProductEnterAmount, amount:number);
}



interface IObjectId {
    getId(): number;
}
interface IBankProductTransfer extends IBankProductUpgradeableBalance {
    toTransfer(destinyBankProduct: IBankProductEnterAmount, amount:number)
}

interface IBankProductUpdateBalance {
    updateBalance(bankProduct: IBankProductUpgradeableBalance);
}

