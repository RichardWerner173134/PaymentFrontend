import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../../model/internal/Payment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { paymentsSelector } from '../../state/selector/app.selector';
import { GetPaymentsResponse } from '../../model/backend/GetPaymentsResponse';
import { fetchPaymentsSuccess } from '../../state/action/app.action';
import { CommonModule } from '@angular/common';
import { PaymentCardComponent } from './payment-card/payment-card.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, PaymentCardComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {

  payments$: Observable<Payment[]> = this.store.select(paymentsSelector);

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.http.get<GetPaymentsResponse>("http://localhost:7066/api/payments")
      .subscribe(data => this.store.dispatch(fetchPaymentsSuccess(
        {payments: data.payments}
      )));    
  }
}
