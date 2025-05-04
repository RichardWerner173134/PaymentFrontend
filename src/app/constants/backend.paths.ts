import { HttpParams } from "@angular/common/http";

export const url: string = "https://rw-payment-backend.azurewebsites.net/api";

// users
export const pathUsers: string = url + "/users";

// payments
export const pathPayments: string = url + "/payments";

export const pathPaymentById: string = pathPayments + "/"; // {paymentId}

export const pathPaymentsForCreditor: string = url + "/payments-for-creditor"; // {username}
export const pathPaymentsForDebitor: string = url + "/payments-for-debitor"; // {username}
export const pathPaymentsForAuthor: string = url + "/payments-for-author"; // {username}

export const pathPaymentOverviewForCreditor: string = url + "/payment-overview-for-creditor/"; // {username}
export const pathPaymentOverviewForDebitor: string = url + "/payment-overview-for-debitor/"; // {username}

// bills
export const pathBills: string = url + "/bills";
export const pathBillsForUser: string = pathBills + "/all/users/"; // {username}

export const pathBillOverviews: string = url + "/bill-overviews";
export const pathBillOverviewsForUser: string = pathBillOverviews + "/all/users/"; // {username}

// hostkey
export const hostKey: string = "xoHPlrmwL7fFNhlIV6LqiW8Zh1vEBAseHHCnvhk9RgXvAzFu5uu2Tw==";