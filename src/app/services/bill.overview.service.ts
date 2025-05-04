import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentBackendAuthService } from "./payment.backend.auth.service";
import { map, Observable } from "rxjs";
import { Bill, GetAllBillOverviewsResponse, GetAllBillsResponse, GetBillOverviewsForUserResponse, GetBillsForUserResponse, ShortBill } from "../model/backend/InternalSwagger";
import { pathBillOverviews, pathBillOverviewsForUser, pathBills, pathBillsForUser } from "../constants/backend.paths";
import { InternalShortBills, InternalShortBillsForUser } from "../model/internal/InternalShortBill";

@Injectable({
    providedIn: 'root'
})
export class BillOverviewService {

    constructor(
        private http: HttpClient,
        private paymentBackendAuthService: PaymentBackendAuthService
    ){}

    public getBillOverviews(): Observable<InternalShortBills>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetAllBillOverviewsResponse>(pathBillOverviews, { params: options })
            .pipe(map(data => {
                return {
                    bills: data.bills,
                    calculationTime: data.calculationTime
                };
            }));
    }

    public getBillOverviewForUser(username: string): Observable<InternalShortBillsForUser>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetBillOverviewsForUserResponse>(pathBillOverviewsForUser + username, { params: options })
            .pipe(map(data => {
                return {
                    bills: data.bills,
                    balance: data.balance,
                    calculationTime: data.calculationTime
                };
            }));
    }
}