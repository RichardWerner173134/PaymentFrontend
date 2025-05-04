import { Component, OnInit } from '@angular/core';
import { User } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { BillService } from '../../services/bill.service';
import { InternalBill } from '../../model/internal/InternalBill';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {  
  users$: Observable<User[]> = this.userService.getCachedUsers();
  bills$: Observable<InternalBill[]> = this.billService.getBills().pipe(map(data => data.bills));

  billsForm: FormGroup = this.formBuilder.group({
    username: ''
  });

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private billService: BillService
  ){}

  ngOnInit(): void {}
 
  reset() {
    this.billsForm.reset();
    this.bills$ = this.billService.getBills().pipe(map(data => data.bills));
  }

  onSubmit() {
    let username: string = this.billsForm.value.username;
    
    if(username == '' || username == undefined){
      this.bills$ = this.billService.getBills().pipe(map(data => data.bills));
    } else {
      this.bills$ = this.billService.getBillsForUser(username).pipe(map(data => data.bills));
    }
  }
}
