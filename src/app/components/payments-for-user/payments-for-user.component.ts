import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GetPaymentsForCreditorResponse, GetPaymentsForDebitorResponse, Payment, PostPaymentRequest } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-payments-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './payments-for-user.component.html',
  styleUrl: './payments-for-user.component.css'
})
export class PaymentsForUserComponent {
  url: string = "http://localhost:7066/api/";
  debitorPath: string = "payments-for-debitor/";
  creditorPath: string = "payments-for-creditor/";

  states: string[] = [
    "Creditor",
    "Debitor"
  ];

  paymentFilter: FormGroup = this.formBuilder.group({
    selection: this.formBuilder.nonNullable.control('Creditor'),
    username: 'Richard'
  });

  payments: Payment[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    let selection: string = this.paymentFilter.value.selection;
    let username: string = this.paymentFilter.value.username;
    
    if(selection == '' || selection == undefined || username == '' || username == undefined){
      return;
    }

    if(selection == 'Creditor'){
      this.http.get<GetPaymentsForCreditorResponse>(this.url + this.creditorPath + username.toLowerCase())
        .subscribe(data => this.payments = data.payments);
      
    } else {
      this.http.get<GetPaymentsForDebitorResponse>(this.url + this.debitorPath + username.toLowerCase())
        .subscribe(data => this.payments = data.payments);
    }
  }

  reset() {
    this.paymentFilter.reset();
    this.payments = [];
  }
}
