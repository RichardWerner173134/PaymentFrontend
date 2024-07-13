import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Payment, GetPaymentOverviewForCreditorResponse, GetPaymentOverviewForDebitorResponse, User, GetUsersResponse } from '../../model/backend/InternalSwagger';
import { NgFor, CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PaymentsTableComponent } from "../../shared/payments-table/payments-table.component";
import { empty, isEmpty, map, Observable, of } from 'rxjs';
import { usersSelector } from '../../state/selector/app.selector';
import { Store } from '@ngrx/store';
import { fetchUsersSuccess } from '../../state/action/app.action';

@Component({
  selector: 'app-payment-overview-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule, PaymentsTableComponent],
  templateUrl: './payment-overview-for-user.component.html',
  styleUrl: './payment-overview-for-user.component.scss'
})
export class PaymentOverviewForUserComponent implements OnInit{
  url: string = "http://localhost:7066/api/";
  debitorPath: string = "payment-overview-for-debitor/";
  creditorPath: string = "payment-overview-for-creditor/";

  usersPath: string = "users";

  states: string[] = [
    "Creditor",
    "Debitor"
  ];

  paymentFilter: FormGroup = this.formBuilder.group({
    selection: this.formBuilder.nonNullable.control('Creditor'),
    username: ''
  });

  payments: Payment[] = [];
  calculationTime?: Date;
  totalWithCreditor?: number;
  totalWithoutCreditor?: number;
  totalDebitorOnly?: number;
  
  users$: Observable<User[]> = this.store.select(usersSelector);

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.users$.pipe(map(u => u.length > 0)).subscribe(data => {
      console.log(data);
      if(data === false) {
        this.http.get<GetUsersResponse>(this.url + this.usersPath)
        .subscribe(data => {
          this.store.dispatch(fetchUsersSuccess({users: data.userList}));
        });
      }
    });
  }

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
