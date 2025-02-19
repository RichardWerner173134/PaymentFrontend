import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GetUsersResponse, User } from "../model/backend/InternalSwagger";
import { pathUsers } from "../constants/backend.paths";
import { Store } from "@ngrx/store";
import { fetchUsersSuccess } from "../state/action/app.action";
import { usersSelector } from "../state/selector/app.selector";
import { PaymentBackendAuthService } from "./payment.backend.auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
        private store: Store,
        private paymentBackendAuthService: PaymentBackendAuthService
    ){}

    public getUsers(): Observable<User[]>{
        let options = this.paymentBackendAuthService.getOptions();
        let users$ = this.http
            .get<GetUsersResponse>(pathUsers, { params: options });
        

        users$.subscribe(data => {
            this.store.dispatch(
                fetchUsersSuccess({ users: data.userList })
            );
        });
        
        return users$.pipe(map(response => response.userList));
    }

    public getCachedUsers(): Observable<User[]>{
        let options = this.paymentBackendAuthService.getOptions();
        let users$ = this.store.select(usersSelector);
        users$.pipe(map(u => u.length > 0)).subscribe(data => {
            if(data === false) {
                this.http.get<GetUsersResponse>(pathUsers, { params: options }).subscribe(data => {
                    this.store.dispatch(fetchUsersSuccess({users: data.userList}));
                });
            }
        });

        return users$;
    }
}