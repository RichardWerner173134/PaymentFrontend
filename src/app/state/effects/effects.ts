import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fetchPaymentContexts, fetchPaymentContextsFailure, fetchPaymentContextsSuccess, noop, setSelectedPaymentContext } from "../action/app.action";
import { catchError, map, of, switchMap } from "rxjs";
import { PaymentContextBackendService } from "../../services/payment.context.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class PaymentEffects {

    private actions$ = inject(Actions);

    constructor(
        private paymentContextBackendService: PaymentContextBackendService,
        private snackbarService: MatSnackBar
    ){}

    fetchPaymentContexts$ = createEffect(() => this.actions$.pipe(
        ofType(fetchPaymentContexts),
        switchMap(() => this.paymentContextBackendService.getAllPaymentContexts().pipe(
            map(result => fetchPaymentContextsSuccess({paymentContexts: result})),
            catchError(() => of(fetchPaymentContextsFailure()))
        ))
    ));

    setInitialPaymentContext$ = createEffect(() => this.actions$.pipe(
        ofType(fetchPaymentContextsSuccess),
        switchMap((action) => of(setSelectedPaymentContext({ selectedPaymentContext: action.paymentContexts[0].id })))
    ));

    // success with length = 0, or failure
    showErrorSnackbarForPaymentContexts$ = createEffect(() => this.actions$.pipe(
        ofType(fetchPaymentContextsFailure),
        switchMap(() => {
            this.snackbarService.open('Keine Urlaube gefunden. PaymentService eingeschränkt verwendbar.',  'Schließen', {
                duration: 3000
            });
            return of(noop());
        })
    ));
}