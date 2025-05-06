import { Injectable } from "@angular/core";
import { GetPaymentContextsResponse, PaymentContext } from "../model/backend/InternalSwagger";
import { HttpClient } from "@angular/common/http";
import { PaymentBackendAuthService } from "./payment.backend.auth.service";
import { map, Observable } from "rxjs";
import { pathPaymentContext, pathPaymentContextById } from "../constants/backend.paths";

@Injectable({providedIn: 'root'})
export class PaymentContextBackendService{
    constructor(
        private http: HttpClient,
        private paymentBackendAuthService: PaymentBackendAuthService
    ){}

    public getAllPaymentContexts(): Observable<PaymentContext[]> {

        let options = this.paymentBackendAuthService.getOptions();

        const result: Observable<PaymentContext[]> = this.http
            .get<GetPaymentContextsResponse>(pathPaymentContext, { params: options })
            .pipe(
                map(data => {
                    const mappedResult: PaymentContext[] | undefined = data.paymentContexts;
                    
                    if (mappedResult == null || mappedResult.length < 1) {
                        throw new Error("Invalid backend result");
                    }

                    return mappedResult;
                })
            );

        return result;
    }
}