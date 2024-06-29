import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterLink, RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ImpressumComponent } from "./shared/impressum/impressum.component";
import { PaymentsComponent } from "./components/payments/payments.component";
import { LoginComponent } from "./components/login/login.component";
import { StoreModule } from '@ngrx/store';
import { apiReducer } from "./state/reducer/app.reducer";
import { CommonModule, NgFor } from "@angular/common";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersComponent } from "./components/users/users.component";
import { NewPaymentComponent } from "./components/new-payment/new-payment.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PaymentsForUserComponent } from "./components/payments-for-user/payments-for-user.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'payments-for-user', component: PaymentsForUserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'new-payment-container', component: NewPaymentComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes),
        RouterLink,
        HttpClientModule,
        NavbarComponent,
        FooterComponent,
        StoreModule.forRoot({ appState: apiReducer }),
        NgFor,
        CommonModule,
        ReactiveFormsModule, 
        HttpClientModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: false, // Restrict extension to log-only mode
        }),
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }