import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  @Input()
  paymentId!: number;

  @Input()
  paymentDescription!: string;
  
  @Input()
  paymentDate!: Date;
  
  @Input()
  price!: number;
  
  @Input()
  debitors!: string[];
  
  @Input()
  creditor!: string;
  
  @Input()
  author!: string;

  @Input()
  updateTime!: Date;
  
  getPricePerPerson() {
    return (this.price / this.debitors.length).toFixed(2);
  }
}
