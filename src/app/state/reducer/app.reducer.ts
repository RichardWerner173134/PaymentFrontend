import { createReducer, on } from "@ngrx/store";
import { AppState } from "../app.state";
import { fetchPaymentsSuccess, fetchUsersSuccess } from "../action/app.action";

export const initialState: AppState = {
    users: [],
    payments: []
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
    }))
);

