import { User, Payment, PaymentContext } from "../model/backend/InternalSwagger";

export interface AppState {
    users: User[];
    payments: Payment[];
    paymentContexts: PaymentContext[],
    selectedPaymentContext: number | undefined
}