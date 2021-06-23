import joi from 'joi';

class UserValidation implements IUserValidation {
    private firstName: string;
    private lastName: string;
    private identificationCard: string;
    private password: string;

    constructor(firstName: string, lastName: string, identificationCard: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationCard = identificationCard;
        this.password = password;
    }

    validationData(){
        const objectSchema = {
            firstName: joi.string(),
            lastName: joi.string(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),
            identificationCard: joi.string().alphanum(),
        };
        const transactionData = {
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            identificationCard: this.identificationCard,
        };
        const schema = joi.object(objectSchema);
        const validate = schema.validate(transactionData);
        if (validate.error) {
            throw validate.error;
        }
    }
}

export default UserValidation;
