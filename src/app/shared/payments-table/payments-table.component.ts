import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { PaymentService } from '../../services/payments.service';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';
import { catchError, EMPTY, filter, switchMap, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.scss'
})
export class PaymentsTableComponent {
  @Input()
  payments: InternalPayment[] | null = [];

  @Input()
  withDelete: boolean = false;

  @Output()
  public update: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private paymentService: PaymentService,
    private store: Store,
    private snackbarService: MatSnackBar,
    private router: Router
  ){}

  deletePayment(paymentId: number): void {
    this.store.select(selectedPaymentContextSelector).pipe(
      filter(selectedPaymentContextSelector => selectedPaymentContextSelector != null),
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
