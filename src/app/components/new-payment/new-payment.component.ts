import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PostPaymentRequest } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-new-payment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit {

  paymentForm: FormGroup = this.formBuilder.group({
    author: ['', Validators.required, Validators.email],
    creditor: ['', Validators.required, Validators.email],
    description: ['', Validators.required],
    paymentDate: [new Date(2024, 1, 1, 10, 0, 0, 0), Validators.required],
    price: [0.00, Validators.required],
    //debitors: this.formBuilder.array([])
    debitors: new FormArray([])
  });

  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router: Router) {
      
  }

  ngOnInit(): void {
  }

  addDebitor() {
    const debitor = this.formBuilder.group({
      debitor: ""
    });

    this.debitors.push(debitor);
  }

  get debitors() {
    return this.paymentForm.controls["debitors"] as FormArray;
  }

  onSubmit(){
    let url = "http://localhost:7066/api/payments";

    let body: PostPaymentRequest = {
      payment: {
        author: this.paymentForm.value.author,
        creditor: this.paymentForm.value.creditor,
        debitors: [this.paymentForm.value.debitors.value],
        paymentDate: this.paymentForm.value.paymentDate,
        paymentDescription: this.paymentForm.value.description,
        price: this.paymentForm.value.price
      }
    }

    this.http.post<any>(
      url, 
      JSON.stringify(body)
    ).subscribe({
      next: () => this.router.navigateByUrl("/payments"), 
      error: (error) => console.error("Couldnt post payment: " + error)
    });
  }

}
