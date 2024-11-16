import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaRequestsComponent } from './qa-requests.component';

describe('QaRequestsComponent', () => {
  let component: QaRequestsComponent;
  let fixture: ComponentFixture<QaRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
