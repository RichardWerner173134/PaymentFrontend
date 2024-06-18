import { User, Payment } from "../model/backend/InternalSwagger";

export interface AppState {
    users: User[];
    payments: Payment[];
}