import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { paymentsSelector } from '../../state/selector/app.selector';
import { fetchPaymentsSuccess } from '../../state/action/app.action';
import { CommonModule } from '@angular/common';
import { GetPaymentsResponse, Payment } from '../../model/backend/InternalSwagger';
import { PaymentsTableComponent } from "../../shared/payments-table/payments-table.component";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, PaymentsTableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  payments$: Observable<Payment[]> = this.store.select(paymentsSelector);

  payments: Payment[] = [];

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.http.get<GetPaymentsResponse>("http://localhost:7066/api/payments")
      .subscribe(data => {
        this.store.dispatch(fetchPaymentsSuccess({ payments: data.payments }));
        this.payments = data.payments;
      }
    );    
  }
}
