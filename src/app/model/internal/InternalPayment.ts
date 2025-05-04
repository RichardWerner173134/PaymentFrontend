export interface InternalAllPayments {
    payments: InternalPayment[];
}

export interface InternalPaymentsById {
    payments?: InternalPayment[];
}

export interface InternalPaymentsForDebitor {
    payments: InternalPayment[];
}

export interface InternalPaymentsForCreditor {
    payments: InternalPayment[];
}

export interface InternalPaymentsForAuthor {
    payments: InternalPayment[];
}

export interface InternalPayment {
    /** resource id of the payment */
    paymentId: number;
    paymentDescription: string;
    /** date of the payment */
    paymentDate: Date;
    price: number;
    debitors: string[];
    creditor: string;
    author: string;
    updateTime: Date;
}