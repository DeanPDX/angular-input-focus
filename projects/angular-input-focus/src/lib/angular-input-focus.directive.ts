import { Directive, ElementRef, Input, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[libFocus]'
})

export class AngularInputFocusDirective implements OnInit {
  private initialized = false;
  private focus = true;
  @Input('libFocus')
  set libFocus(value: boolean) {
    this.focus = value;
    // If we haven't initialized our control yet, nothing to do because `ngOnInit` will set focus for us. 
    if (this.initialized === true) {
      this.setFocusOnElement(this.focus);
    }
  }

  constructor(private el: ElementRef, private zone: NgZone) { }

  ngOnInit() {
    this.initialized = true;
    if (this.focus === false) {
      return;
    }
    // On init, if focus is set, focus element to mimick autofocus functionality.
    this.setFocusOnElement(true);
  }

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
}
