import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOverviewForUserComponent } from './payment-overview-for-user.component';

describe('PaymentOverviewForUserComponent', () => {
  let component: PaymentOverviewForUserComponent;
  let fixture: ComponentFixture<PaymentOverviewForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOverviewForUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentOverviewForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
