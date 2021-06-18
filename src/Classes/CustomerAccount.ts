class CustomerAccount implements ICustomerAccount {
   private accountNumber: string;
   private customerFirstName: string;
   private customerLastName: string;
   private balance: number;

    constructor(accountNumber: string, customerFirstName: string, customerLastName:string, balance:number){
        this.accountNumber = accountNumber;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.balance = balance;
    }

    getBalance(){
        return this.balance;
    }

    getAccountNumber() {
        return this.accountNumber;
    }

    enterAmount(amount: number){
        this.balance = this.balance + amount;
    }

    retractAmount(amount: number){
        this.balance = this.balance - amount;
    }

    toTransfer(destinyAccount: ICustomerAccount, amount:number){
       const currentBalance = this.getBalance();
        if(!amount || currentBalance < amount){
            throw 'The amount to be transferred is invalid';
        }
        destinyAccount.enterAmount(amount);
        this.retractAmount(amount);
    }
}

export default CustomerAccount;