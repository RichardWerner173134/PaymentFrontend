import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Payment, GetPaymentOverviewForCreditorResponse, GetPaymentOverviewForDebitorResponse } from '../../model/backend/InternalSwagger';
import { NgFor, CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-overview-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './payment-overview-for-user.component.html',
  styleUrl: './payment-overview-for-user.component.css'
})
export class PaymentOverviewForUserComponent {
  url: string = "http://localhost:7066/api/";
  debitorPath: string = "payment-overview-for-debitor/";
  creditorPath: string = "payment-overview-for-creditor/";

  states: string[] = [
    "Creditor",
    "Debitor"
  ];

  paymentFilter: FormGroup = this.formBuilder.group({
    selection: this.formBuilder.nonNullable.control('Debitor'),
    username: 'Richard'
  });

  payments: Payment[] = [];
  calculationTime?: Date;
  totalWithCreditor?: number;
  totalWithoutCreditor?: number;
  totalDebitorOnly?: number;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    let selection: string = this.paymentFilter.value.selection;
    let username: string = this.paymentFilter.value.username;
    
    if(selection == '' || selection == undefined || username == '' || username == undefined){
      return;
    }

    if(selection == 'Creditor'){
      this.http.get<GetPaymentOverviewForCreditorResponse>(this.url + this.creditorPath + username.toLowerCase())
        .subscribe(data => {
          this.payments = data.payments;
          this.calculationTime = data.calculationTime;
          this.totalWithCreditor = data.totalWithCreditor;
          this.totalWithoutCreditor = data.totalWithoutCreditor; 

          this.totalDebitorOnly = undefined;
    });
      
    } else {
      this.http.get<GetPaymentOverviewForDebitorResponse>(this.url + this.debitorPath + username.toLowerCase())
        .subscribe(data => {
          this.payments = data.payments;
          this.calculationTime = data.calculationTime;
          this.totalDebitorOnly = data.totalDebitorOnly;

          this.totalWithCreditor = undefined;
          this.totalWithoutCreditor = undefined;
      });
    }
  }

  reset() {
    this.paymentFilter.reset();
    this.payments = [];

    this.totalWithCreditor = undefined;
    this.totalWithoutCreditor= undefined;
    this.calculationTime = undefined;
    this.totalDebitorOnly = undefined;
  }
}
