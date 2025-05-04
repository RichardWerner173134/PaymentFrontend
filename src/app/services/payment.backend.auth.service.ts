import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { hostKey } from "../constants/backend.paths";

@Injectable({
    providedIn: 'root'
})
export class PaymentBackendAuthService {
    
    public getOptions(): HttpParams{
        return new HttpParams().set('code', hostKey);
    }
}