import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { PaymentService } from '../../services/payments.service';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';
import { switchMap, tap } from 'rxjs';

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

  constructor(
    private paymentService: PaymentService,
    private store: Store
  ){}

  deletePayment(paymentId: number): void {
    this.store.select(selectedPaymentContextSelector).pipe(
      tap(selectedPaymentContextSelector => {
        if (selectedPaymentContextSelector == null) {
          throw new Error("Cant resolve without PaymentContext");
        }

        this.paymentService.deletePaymentById(selectedPaymentContextSelector, paymentId);
      })
    );

    
  }
}
