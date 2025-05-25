import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostPaymentRequest, User } from '../../model/backend/InternalSwagger';
import { CommonModule, NgFor } from '@angular/common';
import {
  catchError,
  EMPTY,
  filter,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { UserService } from '../../services/user.service';
import { __param } from 'tslib';
import { PaymentService } from '../../services/payments.service';
import { Store } from '@ngrx/store';
import { selectedPaymentContextSelector } from '../../state/selector/app.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-payment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, CommonModule],
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPaymentComponent implements OnInit {
  users$: Observable<User[]> = this.userService.getCachedUsers();

  paymentForm: FormGroup = this.formBuilder.group({
    author: '',
    creditor: '',
    description: '',
    paymentDate: [new Date(), Validators.required],
    price: 1.0,
    debitors: this.formBuilder.array([
      this.formBuilder.group({
        debitor: '',
      }),
    ]),
  });

  debitorControls: AbstractControl[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private paymentService: PaymentService,
    private store: Store,
    private snackbarService: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.debitorControls = this.debitors.controls;

    this.paymentForm.valueChanges
      .pipe(
        tap(() => {
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  addDebitor() {
    this.debitors.push(this.formBuilder.group({ debitor: '' }));
    this.debitorControls = this.debitors.controls;
    this.cdr.markForCheck();
  }

  removeDebitor(index: number) {
    if (this.debitors.length > 1) {
      this.debitors.removeAt(index);
      this.debitorControls = this.debitors.controls;
      this.cdr.markForCheck();
    }
  }

  get debitors() {
    return this.paymentForm.controls['debitors'] as FormArray;
  }

  onSubmit() {
    let body: PostPaymentRequest = {
      payment: {
        author: this.paymentForm.value.author,
        creditor: this.paymentForm.value.creditor,
        debitors: this.mapDebitors(this.paymentForm.value.debitors),
        paymentDate: new Date(this.paymentForm.value.paymentDate),
        paymentDescription: this.paymentForm.value.description,
        price: Number(this.paymentForm.value.price),
      },
    };

    this.store
      .select(selectedPaymentContextSelector)
      .pipe(
        filter((selectedPaymentContext) => selectedPaymentContext != null),
        take(1),
        switchMap((selectedPaymentContext) =>
          this.paymentService
            .postPayment(selectedPaymentContext!, JSON.stringify(body))
            .pipe(
              switchMap(() =>
                this.snackbarService
                  .open('Rechnung erfolgreich erstellt', 'Ok', { duration: 0 })
                  .onAction()
              ),
              tap(() => {
                this.router.navigateByUrl('/payments');
              }),
              catchError((error) => {
                console.log(error);
                this.snackbarService.open(
                  'Rechnung konnte nicht erstellt werden',
                  'Schließen',
                  { duration: 3000 }
                );
                return EMPTY;
              })
            )
        )
      )
      .subscribe();
  }

  mapDebitors(arg: any[]): string[] {
    let result: string[] = [];
    arg.forEach((element) => {
      result.push(element.debitor);
    });

    return result;
  }
}
