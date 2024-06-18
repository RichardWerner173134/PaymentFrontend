import { createAction, props } from "@ngrx/store";
import { Payment, User } from "../../model/backend/InternalSwagger";

export const fetchUsersSuccess = createAction('[User] Set Users', props<{users: User[]}>());

export const fetchPaymentsSuccess = createAction('[Payment] Set Payments', props<{payments: Payment[]}>());