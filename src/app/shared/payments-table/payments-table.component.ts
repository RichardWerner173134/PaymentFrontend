import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { PaymentService } from '../../services/payments.service';
import { Store } from '@ngrx/store';
import { paymentContextsSelector, selectedPaymentContextSelector } from '../../state/selector/app.selector';
import { catchError, combineLatest, EMPTY, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.scss'
})
export class PaymentsTableComponent implements OnInit {
  @Input()
  payments: InternalPayment[] | null = [];

  @Input()
  withDelete: boolean = false;

  @Output()
  public update: EventEmitter<void> = new EventEmitter<void>();

  protected selectedPaymentContextSelector$!: Observable<number | undefined>;

  protected selectedPaymentContextSelectorIsClosed$! : Observable<boolean | undefined>;

  constructor(
    private paymentService: PaymentService,
    private store: Store,
    private snackbarService: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    this.selectedPaymentContextSelector$ = this.store.select(selectedPaymentContextSelector).pipe(
      filter(selectedPaymentContextSelector => selectedPaymentContextSelector != null)
    );

    this.selectedPaymentContextSelectorIsClosed$ = combineLatest([
      this.store.select(paymentContextsSelector),
      this.selectedPaymentContextSelector$ 
    ]).pipe(
      map(([paymentContexts, selectedPaymentContext]) => paymentContexts.find(ctx => ctx.id == selectedPaymentContext)?.isClosed),
      filter(selectedPaymentContextIsClosed => selectedPaymentContextIsClosed != null)
    );
  }

  deletePayment(paymentId: number): void {
    this.selectedPaymentContextSelector$.pipe(
      take(1),
      switchMap(selectedPaymentContextSelector => 
        this.paymentService.deletePaymentById(selectedPaymentContextSelector!, paymentId).pipe(
          switchMap(() => this.snackbarService.open("Rechnung erfolgreich gelöscht", "Ok", { duration: 0 }).onAction()),
          tap(() => {
            this.router.navigateByUrl("/payments");
            this.update.emit();
          }),
          catchError(error => {
            this.snackbarService.open("Rechnung konnte nicht gelöscht werden", "Schließen", { duration: 3000 });
            return EMPTY;
          })
        )
      )
    ).subscribe();
  }
}
