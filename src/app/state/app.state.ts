import { Payment } from "../model/internal/Payment";
import { User } from "../model/internal/User";

export interface AppState {
    users: User[];
    payments: Payment[];
}