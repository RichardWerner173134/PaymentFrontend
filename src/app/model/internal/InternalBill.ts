import { InternalPayment } from "./InternalPayment";

export interface InternalAllBills {
    calculationTime: Date;
    bills: InternalBill[];
}

export interface InternalBillsForUser {
    calculationTime: Date;
    bills: InternalBill[];
}

export interface InternalBill {
    /** receiver of the money issued with this bill */
    issuedBy: string;
    /** receiver of the money issued with this bill */
    issuedFor: string;
    /** amount of money that needs to be transfered to the receiver of the bill */
    amount: number;
    billComposites: InternalBillComposite[];
}

export interface InternalBillComposite {
    /** portion of the payment price the user issuedFor has to pay to issuedBy */
    amount: number;
    payment: InternalPayment;
}