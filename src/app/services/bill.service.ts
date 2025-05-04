import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentBackendAuthService } from "./payment.backend.auth.service";
import { map, Observable } from "rxjs";
import { Bill, GetAllBillsResponse, GetBillsForUserResponse } from "../model/backend/InternalSwagger";
import { pathBills, pathBillsForUser } from "../constants/backend.paths";
import { InternalAllBills, InternalBill, InternalBillsForUser } from "../model/internal/InternalBill";

@Injectable({
    providedIn: 'root'
})
export class BillService {

    constructor(
        private http: HttpClient,
        private paymentBackendAuthService: PaymentBackendAuthService
    ){}

    public getBills(selectedPaymentContext: number): Observable<InternalAllBills>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetAllBillsResponse>(pathBills(selectedPaymentContext), { params: options })
            .pipe(map(data => {
                return {
                    bills: data.bills,
                    calculationTime: data.calculationTime
                };
            }));
    }

    public getBillsForUser(selectedPaymentContext: number, username: string): Observable<InternalBillsForUser>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetBillsForUserResponse>(pathBillsForUser(selectedPaymentContext, username), { params: options })
            .pipe(map(data => {
                return {
                    bills: data.bills,
                    calculationTime: data.calculationTime
                };
            }));
    }
}