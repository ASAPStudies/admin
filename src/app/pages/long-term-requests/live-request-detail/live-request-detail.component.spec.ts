import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRequestDetailComponent } from './live-request-detail.component';

describe('LiveRequestDetailComponent', () => {
  let component: LiveRequestDetailComponent;
  let fixture: ComponentFixture<LiveRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveRequestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
