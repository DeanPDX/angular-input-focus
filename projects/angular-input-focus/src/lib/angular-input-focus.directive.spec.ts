import { AngularInputFocusDirective } from './angular-input-focus.directive';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ElementRef, EventEmitter, Component, DebugElement, PLATFORM_ID } from '@angular/core';
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

let inputs: DebugElement[];
let fixture: ComponentFixture<TestComponent>;

function getFocusState() {
  return {
    first: inputs[0].nativeElement === document.activeElement,
    second: inputs[1].nativeElement === document.activeElement
  }
}

describe('AngularInputFocusDirective', () => {
  describe('Browser Tests', () => {
    beforeEach(async(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [AngularInputFocusDirective, TestComponent]
      }).createComponent(TestComponent);
      fixture.detectChanges(); // initial binding
      // all elements with an attached HighlightDirective
      inputs = fixture.debugElement.queryAll(By.directive(AngularInputFocusDirective));
    }));
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

  describe('Server Tests', () => {
    beforeEach(async(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [AngularInputFocusDirective, TestComponent],
        providers: [
          { provide: PLATFORM_ID, useValue: 'server' },
        ]
      }).createComponent(TestComponent);
      fixture.detectChanges(); // initial binding
      // all elements with an attached HighlightDirective
      inputs = fixture.debugElement.queryAll(By.directive(AngularInputFocusDirective));
    }));
    it('should perform no-op when not running in browser and auto focus is true', () => {
      const state = getFocusState();
      expect(state.first).toBe(false);
      expect(state.second).toBe(false);
    });
    it('should perform no-op when not running in browser and event emits', () => {
      fixture.componentInstance.focusEvent.emit(true);
      const state = getFocusState();
      // Should do nothing
      expect(state.second).toBe(false);
    });
  });
});