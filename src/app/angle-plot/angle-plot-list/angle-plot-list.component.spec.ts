import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnglePlotListComponent } from './angle-plot-list.component';

describe('AnglePlotListComponent', () => {
  let component: AnglePlotListComponent;
  let fixture: ComponentFixture<AnglePlotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnglePlotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnglePlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
