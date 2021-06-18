
class Transaction {
   private originAccountNumber: string; 
   private destinyAccountNumber: string; 
   private transferredAmount: number;
    constructor(originAccountNumber: string, destinyAccountNumber:string, transferredAmount:number) {
        this.originAccountNumber = originAccountNumber;
        this.destinyAccountNumber = destinyAccountNumber;
        this.transferredAmount = transferredAmount;
    }
}

export default Transaction;
