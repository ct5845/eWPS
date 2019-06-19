import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceAnalysisComponent } from './piece-analysis.component';

describe('PieceAnalysisComponent', () => {
  let component: PieceAnalysisComponent;
  let fixture: ComponentFixture<PieceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
