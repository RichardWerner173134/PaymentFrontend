import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { PaymentService } from '../../services/payments.service';

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
    private paymentService: PaymentService
  ){}

  deletePayment(paymentId: number): void {
    this.paymentService.deletePaymentById(paymentId);
  }

}
