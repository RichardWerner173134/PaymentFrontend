import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { PaymentsTableComponent } from '../../shared/payments-table/payments-table.component';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { map, Observable, of, switchMap } from 'rxjs';
import { PaymentService } from '../../services/payments.service';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';

@Component({
  selector: 'app-payments-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, CommonModule, PaymentsTableComponent],
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
    private paymentsService: PaymentService,
    private store: Store
  ) {}

  onSubmit() {
    let selection: string = this.paymentFilter.value.selection;
    let username: string = this.paymentFilter.value.username;
    
    if(selection == '' || selection == undefined || username == '' || username == undefined){
      return;
    }

    if(selection == 'Gläubiger'){
      this.payments$ = this.store.select(selectedPaymentContextSelector).pipe(
        switchMap(selectedPaymentContext => {
          if (selectedPaymentContext == null) {
            throw new Error("Cant resolve without PaymentContext");
          }

          return this.paymentsService.getPaymentsForCreditor(selectedPaymentContext, username.toLowerCase()).pipe(map(data => data.payments));
        })
      );
    } else {
      this.payments$ = this.store.select(selectedPaymentContextSelector).pipe(
        switchMap(selectedPaymentContext => {
          if (selectedPaymentContext == null) {
            throw new Error("Cant resolve without PaymentContext");
          }

          return this.paymentsService.getPaymentsForDebitor(selectedPaymentContext, username.toLowerCase()).pipe(map(data => data.payments));
        })
      );
    }
  }

  reset() {
    this.paymentFilter.reset();
    this.payments$ = of();
  }
}