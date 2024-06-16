import { Component, Input, input } from '@angular/core';
import { Payment } from '../../../model/internal/Payment';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  @Input()
  payment!: Payment;

  getPricePerPerson() {
    return (this.payment.price / this.payment.debitors.length).toFixed(2);
  }
}
