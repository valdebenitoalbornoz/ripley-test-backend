export interface IContact {
    _id?: string; 
    name: string;
    rut: string;
    email: string;
    phone: string;
    bank: string;
    accountType: string;
    accountNumber: string;
    owner: string;
    createdAt: string | Date;
}