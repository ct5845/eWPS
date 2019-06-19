import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnglePlotCompareComponent } from './angle-plot-compare.component';

describe('AnglePlotCompareComponent', () => {
  let component: AnglePlotCompareComponent;
  let fixture: ComponentFixture<AnglePlotCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnglePlotCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnglePlotCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
