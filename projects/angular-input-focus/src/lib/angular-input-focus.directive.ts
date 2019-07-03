import { Directive, ElementRef, Input, NgZone, EventEmitter, OnDestroy, Inject, PLATFORM_ID, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[libFocus]'
})

/**
 * An angular focus directive.
 * ## Usage
 * For autofocus-like functionality, use like this:
 * <input [libFocus]="true"...>
 * 
 * You can also pass an `EventEmitter<boolean>` as `setFocus` like so:
 * <input [libFocus]="false" [setFocus]="focusEvent">`
 * 
 * Whenever your `focusEvent` emits a value, your element will focus/blur depending on
 * whether it is true or false.
 */
export class AngularInputFocusDirective implements AfterViewInit, OnDestroy {
  /**
   * Indicates whether the current platform is a web browser. Used because our `focus` 
   * implementation is specific to the DOM. Set in constructor.
   */
  private isRunningInBrowser: boolean = null;

  /**
   * When set to true, directive will mimick `autofocus` like functionality for your input.
   */
  @Input('libFocus') focus = false;

  /**
   * When you emit a true value, the input will gain focus. If false, the input will blur.
   */
  @Input('setFocus') set setFocus(value: EventEmitter<boolean>) {
    // Unsubscribe from any previous subs
    this.killSubscriptions.next();
    value.pipe(takeUntil(this.killSubscriptions)).subscribe(focus => this.setFocusOnElement(focus));
  }

  /**
   * Set to true if you want to run outside angular and skip change detection. If you're not using
   * Angular Material, you can pretty safely set to "true".
   */
  @Input() skipChangeDetection = false;

  /**
   * A subject that will emit a value when we should unsubscribe to our observables.
   */
  private killSubscriptions = new Subject();

  /**
   * Set the focus on the target element.
   * @param focus Should the element have focus?
   */
  private setFocusOnElement(focus: boolean) {
    // If we aren't in a browser, there's nothing to do since our implementation is DOM-specific.
    // If we don't have a nativeElement, we have nothing to do either.
    if (this.isRunningInBrowser === false || !this.el.nativeElement) {
      return;
    }
    // Running outside angular zone to not trigger change detection unless we want to.
    this.zone.runOutsideAngular(() => {
      if (focus === true) {
        this.el.nativeElement.focus();
      } else {
        this.el.nativeElement.blur();
      }
      if (!this.skipChangeDetection) {
        this.cd.detectChanges();
      }
    });
  }

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private zone: NgZone, @Inject(PLATFORM_ID) platformId: string) {
    this.isRunningInBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.focus === true) {
      // After view init, if focus is set, focus element to mimick autofocus functionality.
      this.setFocusOnElement(true);
    }
  }

  ngOnDestroy() {
    this.killSubscriptions.next();
    this.killSubscriptions.complete();
  }
}