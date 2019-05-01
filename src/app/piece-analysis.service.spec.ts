import { TestBed } from '@angular/core/testing';

import { PieceAnalysisService } from './piece-analysis.service';

describe('PieceAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PieceAnalysisService = TestBed.get(PieceAnalysisService);
    expect(service).toBeTruthy();
  });
});
