import { createAction, props } from "@ngrx/store";
import { Payment, PaymentContext, User } from "../../model/backend/InternalSwagger";

export const fetchUsersSuccess = createAction('[User] Set Users', props<{users: User[]}>());

export const fetchPaymentsSuccess = createAction('[Payment] Set Payments', props<{payments: Payment[]}>());

//#region payment contexts
export const fetchPaymentContexts = createAction('[PaymentContext] Get PaymentContexts');

export const fetchPaymentContextsSuccess = createAction('[PaymentContext] Get PaymentContexts success', props<{paymentContexts: PaymentContext[]}>());
export const fetchPaymentContextsFailure = createAction('[PaymentContext] Get PaymentContexts failure');

export const setSelectedPaymentContext = createAction('[PaymentContext] Set selected PaymentContext', props<{selectedPaymentContext: number}>());

//#endregion

export const noop = createAction('[App] Noop');
