import { Component, OnInit } from '@angular/core';
import { User } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, map, Observable, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { BillService } from '../../services/bill.service';
import { InternalBill } from '../../model/internal/InternalBill';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {  
  users$: Observable<User[]> = this.userService.getCachedUsers();
  bills$: Observable<InternalBill[]> = this.store.select(selectedPaymentContextSelector).pipe(
    filter(selectedPaymentContext => selectedPaymentContext != null),
    switchMap(selectedPaymentContext => this.billService.getBills(selectedPaymentContext!).pipe(map(data => data.bills)))
  );
  
  billsForm: FormGroup = this.formBuilder.group({
    username: ''
  });

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private billService: BillService,
    private store: Store
  ){}

  ngOnInit(): void {}
 
  reset() {
    this.billsForm.reset();

    this.bills$ = this.store.select(selectedPaymentContextSelector).pipe(
      filter(selectedPaymentContext => selectedPaymentContext != null),
      switchMap(selectedPaymentContext => this.billService.getBills(selectedPaymentContext!).pipe(map(data => data.bills)))
    );
  }

  onSubmit() {
    let username: string = this.billsForm.value.username;
    
    if(username == '' || username == undefined){
      this.bills$ = this.store.select(selectedPaymentContextSelector).pipe(
        filter(selectedPaymentContext => selectedPaymentContext != null),
        switchMap(selectedPaymentContext => this.billService.getBills(selectedPaymentContext!).pipe(map(data => data.bills)))
      );
    } else {
      this.bills$ = this.store.select(selectedPaymentContextSelector).pipe(
        filter(selectedPaymentContext => selectedPaymentContext != null),
        switchMap(selectedPaymentContext => this.billService.getBillsForUser(selectedPaymentContext!, username).pipe(map(data => data.bills)))
      );
    }
  }
}
