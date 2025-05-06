import { createReducer, on } from "@ngrx/store";
import { AppState } from "../app.state";
import { fetchPaymentContexts, fetchPaymentContextsSuccess, fetchPaymentsSuccess, fetchUsersSuccess, setSelectedPaymentContext } from "../action/app.action";

export const initialState: AppState = {
    users: [],
    payments: [],
    paymentContexts: [],
    selectedPaymentContext: undefined
}

export const apiReducer = createReducer(
    initialState,
    
    on(fetchUsersSuccess, (state, action) => ({
        ...state,
        users: action.users
    })),

    
    on(fetchPaymentsSuccess, (state, action) => ({
        ...state,
        payments: action.payments
    })),

    on(fetchPaymentContexts, (state, action) => ({
        ...state
    })),

    on(fetchPaymentContextsSuccess, (state, action) => ({
        ...state,
        paymentContexts: action.paymentContexts
    })),

    on(setSelectedPaymentContext, (state, action) => ({
        ...state,
        selectedPaymentContext: action.selectedPaymentContext
    }))
);

