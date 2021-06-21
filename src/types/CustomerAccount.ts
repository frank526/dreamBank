
type CustomerAccountData = {
     id?: number;
     accountNumber?: string;
     customerFirstName?: string;
     customerLastName?: string;
     balance?: number;
}

type CustommerAccountWhere = {
     id?: number;
     accountNumber?: string;
     customerFirstName?: string;
     customerLastName?: string;
     balance?: number;
}


type UpdateCustomerAccount = (
     accountData: CustomerAccountData,
     where: CustommerAccountWhere
) => Promise<number>