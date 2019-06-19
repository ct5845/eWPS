import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSpeedsComponent } from './training-speeds.component';

describe('TrainingSpeedsComponent', () => {
  let component: TrainingSpeedsComponent;
  let fixture: ComponentFixture<TrainingSpeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSpeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSpeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
