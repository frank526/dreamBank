type ProductBankValue = 'Credito Agil' | 'Tarjeta Credito' | 'Cuenta de Ahorros' | 'Leasing de Vivienda';
type ProductBankStatus = 'Pending' | 'Processed';

declare interface RequestedBankProductPayLoad {
    productBank: ProductBankValue;
    userIdentifiacion: string;
}


