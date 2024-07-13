import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Payment } from '../../model/backend/InternalSwagger';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.scss'
})
export class PaymentsTableComponent {
  deletePaymentUrl: string = "http://localhost:7066/api/payments/";

  @Input()
  payments: Payment[] | undefined;

  @Input()
  withDelete: boolean = false;

  constructor(private http: HttpClient){}

  deletePayment(paymentId: number): void {
    this.http.delete(this.deletePaymentUrl + paymentId)
      .subscribe(data => {
        window.location.reload();
      });
  }

}
