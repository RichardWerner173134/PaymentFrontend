import { createReducer, on } from "@ngrx/store";
import { AppState } from "../app.state";
import { fetchUsersSuccess, setSomeString } from "../action/app.action";

export const initialState: AppState = {
    users:[],
    someStrings: []
}

export const usersReducer = createReducer(
    initialState,
    on(fetchUsersSuccess, (state, action) => ({
        ...state,
        users: action.users
    })),

    on(setSomeString, (state, action) => ({
        ...state,
        someStrings: [...state.someStrings, action.someString]
    }))
);

