import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetAllBillOverviewsResponse, GetBillOverviewsForUserResponse, GetUsersResponse, ShortBill, User } from '../../model/backend/InternalSwagger';
import { NgFor, CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { usersSelector } from '../../state/selector/app.selector';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchUsersSuccess } from '../../state/action/app.action';

@Component({
  selector: 'app-bill-overview-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './bill-overview-for-user.component.html',
  styleUrl: './bill-overview-for-user.component.scss'
})
export class BillOverviewForUserComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(usersSelector);
  url: string = "http://localhost:7066/api/";
  usersPath: string = "users";
    
  billsForm: FormGroup = this.formBuilder.group({
    username: ''
  });
  
  bills: ShortBill[] = [];
  calculationTime?: Date;
  balance?: number;

  billOverviewsUrl: string = "http://localhost:7066/api/bill-overviews";
  billOverviewForUserUrl: string = "http://localhost:7066/api/bill-overviews/all/users/";

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private store: Store
  ){}

  ngOnInit(): void {
    this.http.get<GetAllBillOverviewsResponse>(this.billOverviewsUrl)
        .subscribe(data => {
          this.bills = data.bills;
          this.calculationTime = data.calculationTime;
          this.balance = undefined;
        });

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
 
  reset() {
    this.billsForm.reset();
    this.bills = [];
    this.balance = undefined;
    this.calculationTime = undefined;
  }

  onSubmit() {
    let username: string = this.billsForm.value.username;
    
    if(username == '' || username == undefined){
      this.http.get<GetAllBillOverviewsResponse>(this.billOverviewsUrl)
        .subscribe(data => {
          this.bills = data.bills;
          this.calculationTime = data.calculationTime;
          this.balance = undefined;
        });
    } else {
      this.http.get<GetBillOverviewsForUserResponse>(this.billOverviewForUserUrl + username.toLowerCase())
        .subscribe(data => {
          this.bills = data.bills;
          this.calculationTime = data.calculationTime;
          this.balance = data.balance;
        });
    }
  }
}
