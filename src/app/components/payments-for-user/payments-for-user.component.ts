import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { PaymentsTableComponent } from '../../shared/payments-table/payments-table.component';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { map, Observable, of } from 'rxjs';
import { PaymentService } from '../../services/payments.service';

@Component({
  selector: 'app-payments-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule, PaymentsTableComponent],
  templateUrl: './payments-for-user.component.html',
  styleUrl: './payments-for-user.component.scss'
})
export class PaymentsForUserComponent {
  payments$: Observable<InternalPayment[]> = of();

  states: string[] = [
    "Gläubiger",
    "Schuldner"
  ];

  paymentFilter: FormGroup = this.formBuilder.group({
    selection: this.formBuilder.nonNullable.control('Gläubiger'),
    username: ''
  });

  constructor(
    private formBuilder: FormBuilder, 
    private paymentsService: PaymentService
  ) {}

  onSubmit() {
    let selection: string = this.paymentFilter.value.selection;
    let username: string = this.paymentFilter.value.username;
    
    if(selection == '' || selection == undefined || username == '' || username == undefined){
      return;
    }

    if(selection == 'Gläubiger'){
      this.payments$ = this.paymentsService.getPaymentsForCreditor(username.toLowerCase()).pipe(map(data => data.payments));
    } else {
      this.payments$ = this.paymentsService.getPaymentsForDebitor(username.toLowerCase()).pipe(map(data => data.payments));
    }
  }

  reset() {
    this.paymentFilter.reset();
    this.payments$ = of();
  }
}