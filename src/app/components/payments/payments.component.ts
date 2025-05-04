import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaymentsTableComponent } from "../../shared/payments-table/payments-table.component";
import { PaymentService } from '../../services/payments.service';
import { InternalPayment } from '../../model/internal/InternalPayment';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, PaymentsTableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  payments$: Observable<InternalPayment[]> = this.paymentService.getPayments().pipe(map(data => data.payments));

  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {}
}
