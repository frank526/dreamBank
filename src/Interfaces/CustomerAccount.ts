
interface ICustomerAccount {
    getBalance(): number;
    getAccountNumber(): string;
    enterAmount(amount: number): void;
    retractAmount(amount: number): void;
    toTransfer(originAccount: ICustomerAccount, amount: number): void;
}
