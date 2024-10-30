import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRequestsListComponent } from './live-requests-list.component';

describe('LiveRequestsListComponent', () => {
  let component: LiveRequestsListComponent;
  let fixture: ComponentFixture<LiveRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveRequestsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
