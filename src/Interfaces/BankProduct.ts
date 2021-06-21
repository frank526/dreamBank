interface IBankProductEnterAmount {
    enterAmount(amount: number): void;
}

interface IBankProductRetractAmount {
    retractAmount(amount: number): void;
}

interface IBankProductGetBalance {
    getBalance(): number;
}

interface IBankProductTransfer {
    toTransfer(desitnyBankProduct:IBankProductEnterAmount, amount:number)
}

