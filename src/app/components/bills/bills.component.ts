import { Component, OnInit } from '@angular/core';
import { Bill, GetAllBillsResponse } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {
  billsForm: FormGroup = this.formBuilder.group({
    username: 'Richard'
  });
  
  bills: Bill[] = [];
  calculationTime?: Date;

  url: string = "http://localhost:7066/api/bills";
  urlBillsForUser: string = "http://localhost:7066/api/bills-for-user/";

  constructor(private formBuilder: FormBuilder, private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<GetAllBillsResponse>(this.url)
      .subscribe(data => {
        this.bills = data.bills;
      });
  }
 
  reset() {
    this.billsForm.reset();
    this.bills = [];
  }

  onSubmit() {
    let username: string = this.billsForm.value.username;
    
    if(username == '' || username == undefined){
      this.http.get<GetAllBillsResponse>(this.url)
        .subscribe(data => this.bills = data.bills);
    } else {
      this.http.get<GetAllBillsResponse>(this.urlBillsForUser + username.toLowerCase())
        .subscribe(data => this.bills = data.bills);
    }
  }
}
