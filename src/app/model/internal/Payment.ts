export interface Payment {
    price: number;
    debitors: string[];
    creditor: string;
    updateTime: Date;
    paymentDate: Date;
}