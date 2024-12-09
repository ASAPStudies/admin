import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaDetailComponent } from './qa-detail.component';

describe('QaDetailComponent', () => {
  let component: QaDetailComponent;
  let fixture: ComponentFixture<QaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
