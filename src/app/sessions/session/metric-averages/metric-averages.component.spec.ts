import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricAveragesComponent } from './metric-averages.component';

describe('MetricAveragesComponent', () => {
  let component: MetricAveragesComponent;
  let fixture: ComponentFixture<MetricAveragesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricAveragesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricAveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
