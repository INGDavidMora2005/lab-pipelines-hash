import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { appConfig } from './app.config';

describe('appConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
  });

  it('debe usar HashLocationStrategy para el router', () => {
    expect(TestBed.inject(LocationStrategy)).toBeInstanceOf(HashLocationStrategy);
  });
});
