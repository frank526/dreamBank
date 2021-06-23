import joi from 'joi';

class AccountTransactionValidation implements IAccountTransactionValidation {
    private originAccountNumber: string;
    private destinyAccountNumber: string;
    private transferredAmount: number;
    private description: string;
    constructor(originAccountNumber: string, destinyAccountNumber: string, transferredAmount: number, description?:string) {
        this.originAccountNumber = originAccountNumber;
        this.destinyAccountNumber = destinyAccountNumber;
        this.transferredAmount = transferredAmount;
        this.description = description;
    }

    validateData() {
        const objectSchema = {
            transferredAmount: joi.number().required(),
            originAccountNumber: joi.string().pattern(new RegExp(/^\d{3}-\d{6}-\d{2}$/)).required(),
            destinyAccountNumber: joi.string().pattern(new RegExp(/^\d{3}-\d{6}-\d{2}$/)).required(),
            description: joi.string().optional(),
        };
        const transactionData = {
            originAccountNumber: this.originAccountNumber,
            destinyAccountNumber: this.destinyAccountNumber,
            transferredAmount: this.transferredAmount,
            description: this.description,
        };
        const schema = joi.object(objectSchema);
        const validate = schema.validate(transactionData);
        if (validate.error) {
            throw validate.error;
        }
    }
}

export default AccountTransactionValidation;
