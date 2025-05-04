import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/backend/InternalSwagger';
import { NgFor, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { BillOverviewService } from '../../services/bill.overview.service';
import { InternalShortBill, InternalShortBillsForUser } from '../../model/internal/InternalShortBill';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';

@Component({
  selector: 'app-bill-overview-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, CommonModule],
  templateUrl: './bill-overview-for-user.component.html',
  styleUrl: './bill-overview-for-user.component.scss'
})
export class BillOverviewForUserComponent implements OnInit {
  users$: Observable<User[]> = this.userService.getCachedUsers();
    
  billsForm: FormGroup = this.formBuilder.group({
    username: ''
  });

  bills$: Observable<InternalShortBill[]> = this.store.select(selectedPaymentContextSelector).pipe(
    filter(selectedPaymentContext => selectedPaymentContext != null),
    switchMap(selectedPaymentContext => this.billOverviewService.getBillOverviews(selectedPaymentContext!).pipe(map(data => data.bills))
  ));

  calculationTime?: Date;
  balance?: number;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private billOverviewService: BillOverviewService,
    private store: Store
  ){}

  ngOnInit(): void {}
 
  reset() {
    this.billsForm.reset();
    this.balance = undefined;

    let shortBills$ = this.store.select(selectedPaymentContextSelector).pipe(
      filter(selectedPaymentContext => selectedPaymentContext != null),
      switchMap(selectedPaymentContext => this.billOverviewService.getBillOverviews(selectedPaymentContext!)
    ));

    this.bills$ = shortBills$.pipe(map(data => data.bills));
    shortBills$.subscribe(data => {
      this.balance = undefined;
      this.calculationTime = data.calculationTime;
    })
  }

  onSubmit() {
    let username: string = this.billsForm.value.username;

    // all bill overviews
    if(username == '' || username == undefined){      
      let shortBills$ = this.store.select(selectedPaymentContextSelector).pipe(
        filter(selectedPaymentContext => selectedPaymentContext != null),
        switchMap(selectedPaymentContext => this.billOverviewService.getBillOverviews(selectedPaymentContext!)
      ));

      this.bills$ = shortBills$.pipe(map(data => data.bills));
      shortBills$.subscribe(data => {
        this.balance = undefined;
        this.calculationTime = data.calculationTime;
      })

    // bill overviews for user  
    } else {
      let shortBillsForUser: Observable<InternalShortBillsForUser> = this.store.select(selectedPaymentContextSelector).pipe(
        filter(selectedPaymentContext => selectedPaymentContext != null),
        switchMap(selectedPaymentContext => this.billOverviewService.getBillOverviewForUser(selectedPaymentContext!, username.toLowerCase())
      ));
      
      this.bills$ = shortBillsForUser.pipe(map(data => data.bills));
      shortBillsForUser.subscribe(data => {
        this.balance = data.balance;
        this.calculationTime = data.calculationTime;
      });
    }
  }
}
