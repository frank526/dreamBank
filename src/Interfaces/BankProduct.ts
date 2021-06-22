

interface IBankProductEnterAmount extends IBankProductUpgradeableBalance {
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

interface IObjectId {
    getId(): number;
}
interface IBankProductTransfer extends IBankProductUpgradeableBalance {
    toTransfer(desitnyBankProduct: IBankProductEnterAmount, amount:number)
}

interface IBankProductUpdateBalance {
    updateBalance(bankProduct: IBankProductUpgradeableBalance);
}

