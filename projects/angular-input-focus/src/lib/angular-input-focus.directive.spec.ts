import { AngularInputFocusDirective } from './angular-input-focus.directive';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ElementRef, EventEmitter, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class MockElementRef extends ElementRef {
  constructor() {
     super(null);
  }
}

@Component({
  template: `
  <!-- For testing autofocus like functionality -->
  <input [libFocus]="true">
  <!-- For testing event-driven functionality -->
  <input [libFocus]="false" [setFocus]="focusEvent">`
})
class TestComponent {
  public focusEvent = new EventEmitter<boolean>();
}

const mockNgZone = jasmine.createSpyObj('mockNgZone', ['run', 'runOutsideAngular']);
mockNgZone.run.and.callFake(fn => fn());

let elementRef: ElementRef;
let inputs: DebugElement[];
let fixture: ComponentFixture<TestComponent>;

beforeEach(async(() => {
  fixture = TestBed.configureTestingModule({
    declarations: [AngularInputFocusDirective, TestComponent],
    providers: [
      { provide: ElementRef, useValue: MockElementRef }
    ]
  }).createComponent(TestComponent);
  fixture.detectChanges(); // initial binding
  // all elements with an attached HighlightDirective
  inputs = fixture.debugElement.queryAll(By.directive(AngularInputFocusDirective));
  elementRef = TestBed.get(ElementRef);
}));

describe('AngularInputFocusDirective', () => {
  it('should create an instance', () => {
    const directive = new AngularInputFocusDirective(elementRef, mockNgZone);
    expect(directive).toBeTruthy();
  });

  it('should auto focus first element', () => {
    const state = getFocusState();
    expect(state.first).toBe(true);
    expect(state.second).toBe(false);
  });

  it('should allow event-based focus', () => {
    fixture.componentInstance.focusEvent.emit(true);
    const state = getFocusState();
    expect(state.first).toBe(false);
    expect(state.second).toBe(true);
  });

  it('should allow event-based blur', () => {
    // Set focus on second input to remove from first
    fixture.componentInstance.focusEvent.emit(true);
    // Now blur second input
    fixture.componentInstance.focusEvent.emit(false);
    const state = getFocusState();
    expect(state.first).toBe(false);
    expect(state.second).toBe(false);
  });
});

function getFocusState() {
  return { 
    first: inputs[0].nativeElement === document.activeElement,
    second: inputs[1].nativeElement === document.activeElement
  }
}