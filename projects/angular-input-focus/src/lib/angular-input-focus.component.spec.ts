import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularInputFocusComponent } from './angular-input-focus.component';

describe('AngularInputFocusComponent', () => {
  let component: AngularInputFocusComponent;
  let fixture: ComponentFixture<AngularInputFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularInputFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularInputFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
