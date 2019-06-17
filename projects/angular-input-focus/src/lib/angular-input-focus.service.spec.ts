import { TestBed } from '@angular/core/testing';

import { AngularInputFocusService } from './angular-input-focus.service';

describe('AngularInputFocusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularInputFocusService = TestBed.get(AngularInputFocusService);
    expect(service).toBeTruthy();
  });
});
