import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaListComponent } from './qa-list.component';

describe('QaListComponent', () => {
  let component: QaListComponent;
  let fixture: ComponentFixture<QaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
