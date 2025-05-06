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
  
    public getPayments(selectedPaymentContext: number): Observable<InternalAllPayments>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsResponse>(pathPayments(selectedPaymentContext), { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public postPayment(selectedPaymentContext: number, body: any): Observable<Object> {
        let options = this.paymentBackendAuthService.getOptions();
        return this.http.post(
            pathPayments(selectedPaymentContext), 
            body,
            {params: options}
        );
    }

    public getPaymentById(selectedPaymentContext: number, paymentId: number): Observable<InternalPaymentsById>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsByIdResponse>(pathPaymentById(selectedPaymentContext, paymentId), { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public deletePaymentById(selectedPaymentContext: number, paymentId: number): Observable<Object>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .delete(pathPaymentById(selectedPaymentContext, paymentId), { params: options });
            //.subscribe(() => window.location.reload());
    }

    public getPaymentsForCreditor(selectedPaymentContext: number, username: string): Observable<InternalPaymentsForCreditor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsForCreditorResponse>(pathPaymentsForCreditor(selectedPaymentContext, username), { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public getPaymentsForDebitor(selectedPaymentContext: number, username: string): Observable<InternalPaymentsForDebitor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsForDebitorResponse>(pathPaymentsForDebitor(selectedPaymentContext, username), { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }

    public getPaymentsForAuthor(selectedPaymentContext: number, username: string): Observable<InternalPaymentsForDebitor>{
        let options = this.paymentBackendAuthService.getOptions();
        return this.http
            .get<GetPaymentsForAuthorResponse>(pathPaymentsForAuthor(selectedPaymentContext, username), { params: options })
            .pipe(map(data => {
                return {
                    payments: data.payments
                }
            })); 
    }
}