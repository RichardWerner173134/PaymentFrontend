import { createAction, props } from "@ngrx/store";
import { User } from "../../model/internal/User";
import { Payment } from "../../model/internal/Payment";

export const fetchUsersSuccess = createAction('[User] Set Users', props<{users: User[]}>());

export const fetchPaymentsSuccess = createAction('[Payments] Set Users', props<{payments: Payment[]}>());