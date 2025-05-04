import { Injectable, ɵresetJitOptions } from "@angular/core";
import { map, Observable } from "rxjs";
import { GetPaymentsByIdResponse, GetPaymentsForAuthorResponse, GetPaymentsForCreditorResponse, GetPaymentsForDebitorResponse, GetPaymentsResponse, Payment } from "../model/backend/InternalSwagger";
import { HttpClient } from "@angular/common/http";
import { pathPaymentById, pathPayments, pathPaymentsForAuthor, pathPaymentsForCreditor, pathPaymentsForDebitor } from "../constants/backend.paths";
import { PaymentBackendAuthService } from "./payment.backend.auth.service";
import { InternalAllPayments, InternalPaymentsById, InternalPaymentsForCreditor, InternalPaymentsForDebitor } from "../model/internal/InternalPayment";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(
        private http: HttpClient,
        private paymentBackendAuthService: PaymentBackendAuthService
    ){}
  
    public getPayments(): Observable<InternalAllPayments>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsResponse>(pathPayments, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public postPayment(body: any): Observable<Object> {
        let options = this.paymentBackendAuthService.getOptions();
        return this.http.post(
            pathPayments, 
            body,
            {params: options}
        );
    }

    public getPaymentById(paymentId: number): Observable<InternalPaymentsById>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsByIdResponse>(pathPaymentById + paymentId, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public deletePaymentById(paymentId: number): void{
        let options = this.paymentBackendAuthService.getOptions();
        this.http
            .delete(pathPaymentById + paymentId, { params: options })
            .subscribe(() => window.location.reload());
    }

    public getPaymentsForCreditor(username: string): Observable<InternalPaymentsForCreditor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsForCreditorResponse>(pathPaymentsForCreditor + username, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public getPaymentsForDebitor(username: string): Observable<InternalPaymentsForDebitor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsForDebitorResponse>(pathPaymentsForDebitor + username, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public getPaymentsForAuthor(username: string): Observable<InternalPaymentsForDebitor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsForAuthorResponse>(pathPaymentsForAuthor + username, { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }
}