import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { AppState } from "../app.state";

const NAME_OF_APP_STATE_STORE = 'appState';

export const selectAppState = createFeatureSelector<AppState>(NAME_OF_APP_STATE_STORE);

/*
    users
*/
export const usersSelector = createSelector(
    selectAppState,
    (state: AppState) => state.users
);

export const paymentsSelector = createSelector(
    selectAppState,
    (state: AppState) => state.payments
);