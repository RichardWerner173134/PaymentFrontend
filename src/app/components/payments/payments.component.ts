import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaymentsTableComponent } from "../../shared/payments-table/payments-table.component";
import { PaymentService } from '../../services/payments.service';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, PaymentsTableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  protected payments$: Observable<InternalPayment[]> = this.store.select(selectedPaymentContextSelector).pipe(
    filter(selectedPaymentContextSelector => selectedPaymentContextSelector != null),
    switchMap(selectedPaymentContext => this.paymentService.getPayments(selectedPaymentContext!).pipe(map(data => data.payments)))
  );
  
  constructor(
    private paymentService: PaymentService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  refresh(): void {
    this.payments$ = this.store.select(selectedPaymentContextSelector).pipe(
      filter(selectedPaymentContextSelector => selectedPaymentContextSelector != null),
      switchMap(selectedPaymentContext => this.paymentService.getPayments(selectedPaymentContext!).pipe(map(data => data.payments)))
    );
  }
}
