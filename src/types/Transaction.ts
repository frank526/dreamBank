type TransactionData = {
    id?: string;
    originAccountNumber?: string;
    destinyAccountNumber?: string;
    description?: string;
    transferredAmount?: number;
}

type TransactionWhere = {
    id?: string;
    originAccountNumber?: string;
    destinyAccountNumber?: string;
    description?: string;
    transferredAmount?: number;
}
