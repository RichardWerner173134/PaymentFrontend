import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectAppState = createFeatureSelector<AppState>('appState');

export const usersSelector = createSelector(
    selectAppState,
    (state: AppState) => state.users
);

export const someStringsSelector = createSelector(
    selectAppState,
    (state: AppState) => state.someStrings
);