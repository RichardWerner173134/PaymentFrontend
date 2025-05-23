//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.8.0 (NJsonSchema v11.0.1.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming



export interface GetUsersResponse {
    userList: User[];

    [key: string]: any;
}

export interface GetPaymentContextsResponse {
    paymentContexts?: PaymentContext[];

    [key: string]: any;
}

export interface GetPaymentsResponse {
    payments: Payment[];

    [key: string]: any;
}

export interface PostPaymentRequest {
    payment: PostPayment;

    [key: string]: any;
}

export interface GetPaymentsByIdResponse {
    payments?: Payment[];

    [key: string]: any;
}

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;

    [key: string]: any;
}

export interface Payment {
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

    [key: string]: any;
}

export interface PaymentContext {
    id: number;
    name: string;
    isClosed: boolean;

    [key: string]: any;
}

export interface PostPayment {
    paymentDescription: string;
    /** date of the payment */
    paymentDate: Date;
    price: number;
    debitors: string[];
    creditor: string;
    /** username of the user who created this payment */
    author: string;

    [key: string]: any;
}

export interface GetPaymentsForDebitorResponse {
    payments: Payment[];

    [key: string]: any;
}

export interface GetPaymentsForCreditorResponse {
    payments: Payment[];

    [key: string]: any;
}

export interface GetPaymentsForAuthorResponse {
    payments: Payment[];

    [key: string]: any;
}

export interface GetPaymentOverviewForDebitorResponse {
    payments: Payment[];
    /** date of the calculation */
    calculationTime: Date;
    totalDebitorOnly: number;

    [key: string]: any;
}

export interface GetPaymentOverviewForCreditorResponse {
    payments: Payment[];
    /** date of the calculation */
    calculationTime: Date;
    totalWithCreditor: number;
    totalWithoutCreditor: number;

    [key: string]: any;
}

export interface GetAllBillsResponse {
    calculationTime: Date;
    bills: Bill[];

    [key: string]: any;
}

export interface GetBillsForUserResponse {
    calculationTime: Date;
    bills: Bill[];

    [key: string]: any;
}

export interface GetAllBillOverviewsResponse {
    calculationTime: Date;
    bills: ShortBill[];

    [key: string]: any;
}

export interface GetBillOverviewsForUserResponse {
    calculationTime: Date;
    bills: ShortBill[];
    /** balance of the user over all bills. Positive -> you get money back. Negative -> you have to pay a lot */
    balance: number;

    [key: string]: any;
}

export interface Bill {
    /** receiver of the money issued with this bill */
    issuedBy: string;
    /** receiver of the money issued with this bill */
    issuedFor: string;
    /** amount of money that needs to be transfered to the receiver of the bill */
    amount: number;
    billComposites: BillComposite[];

    [key: string]: any;
}

export interface ShortBill {
    /** receiver of the money issued with this bill */
    issuedBy: string;
    /** receiver of the money issued with this bill */
    issuedFor: string;
    /** amount of money that needs to be transfered to the receiver of the bill */
    amount: number;

    [key: string]: any;
}

export interface BillComposite {
    /** portion of the payment price the user issuedFor has to pay to issuedBy */
    amount: number;
    payment: Payment;

    [key: string]: any;
}