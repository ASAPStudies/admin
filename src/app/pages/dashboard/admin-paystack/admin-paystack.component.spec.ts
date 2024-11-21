import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaystackComponent } from './admin-paystack.component';

describe('AdminPaystackComponent', () => {
  let component: AdminPaystackComponent;
  let fixture: ComponentFixture<AdminPaystackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaystackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPaystackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
