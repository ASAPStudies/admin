import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermRequestsComponent } from './long-term-requests.component';

describe('LongTermRequestsComponent', () => {
  let component: LongTermRequestsComponent;
  let fixture: ComponentFixture<LongTermRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongTermRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongTermRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
