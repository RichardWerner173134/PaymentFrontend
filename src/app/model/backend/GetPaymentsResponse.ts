export interface GetPaymentsResponse {
    payments: PaymentType[];
}

export interface PaymentType {
    price: number;
    debitors: string[];
    creditor: string;
    updateTime: Date;
    paymentDate: Date;
}