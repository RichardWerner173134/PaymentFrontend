import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchPaymentContexts, setSelectedPaymentContext } from "../../state/action/app.action";
import { paymentContextsSelector } from "../../state/selector/app.selector";
import { Observable } from "rxjs";
import { PaymentContext } from "../../model/backend/InternalSwagger";

@Component({
    selector: 'app-payment-context',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './payment-context.component.html',
    styleUrl: './payment-context.component.scss'
  })
  export class PaymentContextComponent implements OnInit{
    protected paymentContexts: Observable<PaymentContext[]> = this.store.select(paymentContextsSelector);
    selectedContextId!: number;

    constructor(
      protected store: Store
    ){}

    public ngOnInit(): void {
        this.store.dispatch(fetchPaymentContexts());
    }

    protected onChange($event: any) {
      const selectedPaymentContext: string = ($event.target as HTMLSelectElement).value;
      const selectedPaymentContextAsNumber = parseInt(selectedPaymentContext, 10);
      this.store.dispatch(setSelectedPaymentContext({selectedPaymentContext: selectedPaymentContextAsNumber}));
    }
  }