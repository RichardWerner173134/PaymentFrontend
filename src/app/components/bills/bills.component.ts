import { Component, OnInit } from '@angular/core';
import { Bill, GetAllBillsResponse, GetBillOverviewsForUserResponse, GetBillsForUserResponse, GetUsersResponse, User } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { usersSelector } from '../../state/selector/app.selector';
import { fetchUsersSuccess } from '../../state/action/app.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {  
  users$: Observable<User[]> = this.store.select(usersSelector);
  url: string = "http://localhost:7066/api/";
  usersPath: string = "users";

  billsForm: FormGroup = this.formBuilder.group({
    username: ''
  });
  
  bills: Bill[] = [];
  calculationTime?: Date;

  urlBills: string = "http://localhost:7066/api/bills";
  urlBillsForUser: string = "http://localhost:7066/api/bills/all/users/";

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private store: Store){}

  ngOnInit(): void {
    this.http.get<GetAllBillsResponse>(this.urlBills)
      .subscribe(data => {
        this.bills = data.bills;
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
  }

  onSubmit() {
    let username: string = this.billsForm.value.username;
    
    if(username == '' || username == undefined){
      this.http.get<GetAllBillsResponse>(this.urlBills)
        .subscribe(data => this.bills = data.bills);
    } else {
      this.http.get<GetBillsForUserResponse>(this.urlBillsForUser + username.toLowerCase())
        .subscribe(data => this.bills = data.bills);
    }
  }
}
