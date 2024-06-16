import { createAction, props } from "@ngrx/store";
import { User } from "../../model/user";

export const fetchUsersSuccess = createAction('[User] Set Users', props<{users: User[]}>());

export const setSomeString = createAction("[someString] Set SomeStrings", props<{ someString: string}>());