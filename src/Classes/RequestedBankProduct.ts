
class RequestedBankProduct {
    private userId: number;
    private productBank: ProductBankValue;
    private status: ProductBankStatus;

    constructor(userId: number, productBank:ProductBankValue, status:ProductBankStatus) {
        this.userId = userId;
        this.productBank = productBank;
        this.status = status;
    }
}

export default RequestedBankProduct;
