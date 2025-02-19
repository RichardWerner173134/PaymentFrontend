import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentBackendAuthService } from "./payment.backend.auth.service";
import { map, Observable } from "rxjs";
import { pathPaymentOverviewForCreditor, pathPaymentOverviewForDebitor } from "../constants/backend.paths";
import { GetPaymentOverviewForCreditorResponse, GetPaymentOverviewForDebitorResponse } from "../model/backend/InternalSwagger";
import { InternalPaymentOverviewForCreditor, InternalPaymentOverviewForDebitor } from "../model/internal/InternalPaymentOverview";

@Injectable({
    providedIn: 'root'
})
export class PaymentOverviewService {

    constructor(
        private http: HttpClient,
        private paymentBackendAuthService: PaymentBackendAuthService
    ){}
    
    public getPaymentOverviewForCreditor(username: string): Observable<InternalPaymentOverviewForCreditor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentOverviewForCreditorResponse>(pathPaymentOverviewForCreditor + username, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments,
                    calculationTime: data.calculationTime,
                    totalWithCreditor: data.totalWithCreditor,
                    totalWithoutCreditor: data.totalWithoutCreditor
                }
            })); 
    }

    public getPaymentOverviewForDebitor(username: string): Observable<InternalPaymentOverviewForDebitor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentOverviewForDebitorResponse>(pathPaymentOverviewForDebitor + username, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments,
                    calculationTime: data.calculationTime,
                    totalDebitorOnly: data.totalDebitorOnly
                }
            })); 
    }
}