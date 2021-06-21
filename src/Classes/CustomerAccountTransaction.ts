import joi from 'joi';

class CustomerAccountTransaction implements IBankProductTransaction {
    private originAccountNumber: string;
    private destinyAccountNumber: string;
    private transferredAmount: number;
    constructor(originAccountNumber: string, destinyAccountNumber: string, transferredAmount: number) {
        this.originAccountNumber = originAccountNumber;
        this.destinyAccountNumber = destinyAccountNumber;
        this.transferredAmount = transferredAmount;
    }

    validateData() {
        const objectSchema = {
            amount: joi.number().required(),
            originAccountNumber: joi.string().pattern(new RegExp('^\d{3}-\d{6}-\d{2}$')).required(),
            destinyAccountNumber: joi.string().pattern(new RegExp('^\d{3}-\d{6}-\d{2}$')).required(),
        };
        const transactionData = {
            originAccountNumber: this.originAccountNumber,
            destinyAccountNumber: this.destinyAccountNumber,
            transferredAmount: this.transferredAmount,
        };
        const schema = joi.object(objectSchema);
        const validate = schema.validate(transactionData);
        if (validate.error) {
            throw validate.error;
        }
    }
}

export default CustomerAccountTransaction;
