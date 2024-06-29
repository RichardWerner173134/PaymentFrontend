import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsForUserComponent } from './payments-for-user.component';

describe('PaymentsForUserComponent', () => {
  let component: PaymentsForUserComponent;
  let fixture: ComponentFixture<PaymentsForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsForUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentsForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
