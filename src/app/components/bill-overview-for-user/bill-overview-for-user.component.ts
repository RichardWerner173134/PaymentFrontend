import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Bill, GetAllBillsResponse, GetBillOverviewForUser, ShortBill } from '../../model/backend/InternalSwagger';
import { NgFor, CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bill-overview-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './bill-overview-for-user.component.html',
  styleUrl: './bill-overview-for-user.component.css'
})
export class BillOverviewForUserComponent {
  billsForm: FormGroup = this.formBuilder.group({
    username: 'Richard'
  });
  
  bills: ShortBill[] = [];
  calculationTime?: Date;
  balance?: number;

  url: string = "http://localhost:7066/api/bill-overview-for-user/";

  constructor(private formBuilder: FormBuilder, private http: HttpClient){}

  ngOnInit(): void {
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
      return;
    } else {
      this.http.get<GetBillOverviewForUser>(this.url + username.toLowerCase())
        .subscribe(data => {
          this.bills = data.bills;
          this.calculationTime = data.calculationTime;
          this.balance = data.balance;
        });
    }
  }
}
