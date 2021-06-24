import joi from 'joi';

class UserValidation implements IUserGeneralValidationData, IUserValidationIdentificationPassword {
 
    validationGeneralData(firstName: string, lastName: string, identificationCard: string, password: string){
        const objectSchema = {
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).required(),
            identificationCard: joi.string().alphanum().required(),
        };
        const transactionData = {
            firstName,
            lastName,
            password,
            identificationCard,
        };
        const schema = joi.object(objectSchema);
        const validate = schema.validate(transactionData);
        if (validate.error) {
            throw validate.error;
        }
    }

    validateIdentificactionPassword(identificationCard: string, password: string) {
        const objectSchema = {
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).required(),
            identificationCard: joi.string().alphanum().required(),
        };
        const transactionData = {
            password,
            identificationCard,
        };
        const schema = joi.object(objectSchema);
        const validate = schema.validate(transactionData);
        if (validate.error) {
            throw validate.error;
        }
    }
}

export default UserValidation;
