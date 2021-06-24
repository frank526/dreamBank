
type CustomerAccountData = {
     id?: number;
     accountNumber?: string;
     customerFirstName?: string;
     customerLastName?: string;
     balance?: number;
}

type CustomerAccountWhere = {
     id?: number;
     accountNumber?: string;
     customerFirstName?: string;
     customerLastName?: string;
     balance?: number;
     userId?: string;
}


type UpdateCustomerAccount = (
     accountData: CustomerAccountData,
     where: CustomerAccountWhere
) => Promise<number>