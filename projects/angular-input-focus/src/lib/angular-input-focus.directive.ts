import { Directive, ElementRef, Input, NgZone, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[libFocus]'
})

export class AngularInputFocusDirective implements OnInit, OnDestroy {
  @Input('libFocus') focus = true;
  /**
   * When you emit a true value, the input will gain focus. If false, the input will blur.
   */
  @Input('setFocus') set setFocus(value: EventEmitter<boolean>) {
    // Unsubscribe from any previous subs
    this.killSubscriptions.next();
    value.pipe(takeUntil(this.killSubscriptions)).subscribe(focus => this.setFocusOnElement(focus));
  }

  /**
   * A subject that will emit a value when we should unsubscribe to our observables.
   */
  private killSubscriptions = new Subject();

  /**
   * Set the focus on the target element.
   * @param focus Should the element have focus?
   */
  private setFocusOnElement(focus: boolean) {
    this.zone.runOutsideAngular(() => {
      if (focus === true) {
        this.el.nativeElement.focus();
      } else {
        this.el.nativeElement.blur();
      }
    });
  }

  constructor(private el: ElementRef, private zone: NgZone) { }

  ngOnInit() {
    if (this.focus === true) {
      // On init, if focus is set, focus element to mimick autofocus functionality.
      this.setFocusOnElement(true);
    }
  }

  ngOnDestroy() {
    this.killSubscriptions.next();
    this.killSubscriptions.complete();
  }
}
