class CustomerAccount implements IBankProductEnterAmount, IBankProductRetractAmount, IBankProductGetBalance, IBankProductTransfer, IObjectId, IGetAccountNumber {
   private id: number;
   private accountNumber: string;
   private customerFirstName: string;
   private customerLastName: string;
   private balance: number;

    constructor(accountNumber: string, customerFirstName: string, customerLastName:string, balance:number, id?:number){
        this.accountNumber = accountNumber;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.balance = balance;
        this.id = id;
    }

    getId(){
        return this.id;
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

    toTransfer(destinyAccount: IBankProductEnterAmount, amount: number) {
        const currentBalance = this.getBalance();
        if(!amount){
            throw 'Invalid Amount';
        }
        if(amount > currentBalance) {
            throw 'Balance is insufficient';
        }
        destinyAccount.enterAmount(amount);
        this.retractAmount(amount);
        return true;
    }
}

export default CustomerAccount;