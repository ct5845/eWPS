import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceCurveComponent } from './force-curve.component';

describe('ForceCurveComponent', () => {
  let component: ForceCurveComponent;
  let fixture: ComponentFixture<ForceCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
