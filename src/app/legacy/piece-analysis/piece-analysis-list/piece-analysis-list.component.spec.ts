import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceAnalysisListComponent } from './piece-analysis-list.component';

describe('PieceAnalysisListComponent', () => {
  let component: PieceAnalysisListComponent;
  let fixture: ComponentFixture<PieceAnalysisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieceAnalysisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
