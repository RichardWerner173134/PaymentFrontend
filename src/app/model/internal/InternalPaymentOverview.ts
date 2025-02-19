import { InternalPayment } from "./InternalPayment";

export interface InternalPaymentOverviewForDebitor {
    payments: InternalPayment[];
    /** date of the calculation */
    calculationTime: Date;
    totalDebitorOnly: number;
}

export interface InternalPaymentOverviewForCreditor {
    payments: InternalPayment[];
    /** date of the calculation */
    calculationTime: Date;
    totalWithCreditor: number;
    totalWithoutCreditor: number;
}