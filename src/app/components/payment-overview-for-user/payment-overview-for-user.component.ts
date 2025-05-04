import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/backend/InternalSwagger';
import { NgFor, CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PaymentsTableComponent } from "../../shared/payments-table/payments-table.component";
import { map, Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { PaymentOverviewService } from '../../services/payment.overviews.service';
import { InternalPayment } from '../../model/internal/InternalPayment';
import { InternalPaymentOverviewForCreditor, InternalPaymentOverviewForDebitor } from '../../model/internal/InternalPaymentOverview';

@Component({
  selector: 'app-payment-overview-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule, PaymentsTableComponent],
  templateUrl: './payment-overview-for-user.component.html',
  styleUrl: './payment-overview-for-user.component.scss'
})
export class PaymentOverviewForUserComponent implements OnInit{
  users$: Observable<User[]> = this.userService.getCachedUsers();
  payments$: Observable<InternalPayment[]> = of();

  calculationTime?: Date;
  totalWithCreditor?: number;
  totalWithoutCreditor?: number;
  totalDebitorOnly?: number;

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
    private userService: UserService,
    private paymentOverviewService: PaymentOverviewService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let selection: string = this.paymentFilter.value.selection;
    let username: string = this.paymentFilter.value.username;
    
    if(selection == '' || selection == undefined || username == '' || username == undefined){
      return;
    }
    
    if(selection == 'Gläubiger'){
      let paymentOverview$: Observable<InternalPaymentOverviewForCreditor> = this.paymentOverviewService.getPaymentOverviewForCreditor(username.toLowerCase());

      this.payments$ = paymentOverview$.pipe(map(data => data.payments));
      paymentOverview$.subscribe(data => {
        this.calculationTime = data.calculationTime;
        this.totalWithCreditor = data.totalWithCreditor;
        this.totalWithoutCreditor = data.totalWithoutCreditor;

        this.totalDebitorOnly = undefined;
      });

    } else {
      let paymentOverview$: Observable<InternalPaymentOverviewForDebitor> = this.paymentOverviewService.getPaymentOverviewForDebitor(username.toLowerCase());

      this.payments$ = paymentOverview$.pipe(map(data => data.payments));
      paymentOverview$.subscribe(data => {
        this.calculationTime = data.calculationTime;
        this.totalDebitorOnly = data.totalDebitorOnly;

        this.totalWithCreditor = undefined;
        this.totalWithoutCreditor = undefined;
      })
    }
  }

  reset() {
    this.paymentFilter.reset();
    this.payments$ = of();

    this.totalWithCreditor = undefined;
    this.totalWithoutCreditor= undefined;
    this.calculationTime = undefined;
    this.totalDebitorOnly = undefined;
  }
}