import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnglePlotComponent } from './angle-plot.component';

describe('AnglePlotComponent', () => {
  let component: AnglePlotComponent;
  let fixture: ComponentFixture<AnglePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnglePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnglePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
