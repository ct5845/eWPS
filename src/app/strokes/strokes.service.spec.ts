import { TestBed } from '@angular/core/testing';

import { StrokesService } from './strokes.service';

describe('StrokesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrokesService = TestBed.get(StrokesService);
    expect(service).toBeTruthy();
  });
});
