
interface IUserValidationIdentificationPassword {
    validateIdentificactionPassword(identificationCard: string, password: string);
}

interface IUserGeneralValidationData {
    validationGeneralData(firstName: string, lastName: string, identificationCard: string, password: string);
}

interface IUserDBRetrieve {
    getUser(where: UserWhere, attributes?:string[])
}

interface IUserStorageRetrieve {
    getUser(where: UserWhere, attributes?:string[]);
}

interface IUserValidationIdentification {
    validateIdentification(identificationCard: string);
}

interface IUserPasswordEncrypt {
    encrypt(password:string)
}

interface IUserComparePassword {
    comparePassword(passwordPlainText: string, passwordHash: string)
}

interface IUserDBCreate {
    create(userData: IUser)
}

interface IUserStorageCreate {
    create(userData: IUser)
}

interface IUser {}

interface IUserValidationCredentials {
    validateCredentials(identificationCard: string, password: string)
}

interface IUserTokenData {
    id: number;
    identificationCard: string;
    password: string;
}

interface IUserAuthTokenGenerateToken {
    generateToken(userData: IUserTokenData)
}

interface IUserDecodedToken {
    decodedToken(token: string)
}

interface IUserAuthentication {
    authentication(identificationCard: string, password: string)
}

interface IUserValidateToken {
    validateToken(token: string)
}

