import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOverviewForUserComponent } from './bill-overview-for-user.component';

describe('BillOverviewForUserComponent', () => {
  let component: BillOverviewForUserComponent;
  let fixture: ComponentFixture<BillOverviewForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOverviewForUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillOverviewForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
