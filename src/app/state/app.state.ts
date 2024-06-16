import { User } from "../model/user";

export interface AppState {
    users: User[];
    someStrings: string[];
}