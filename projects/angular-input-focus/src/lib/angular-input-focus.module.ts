import { NgModule } from '@angular/core';
import { AngularInputFocusDirective } from './angular-input-focus.directive';

@NgModule({
  declarations: [AngularInputFocusDirective],
  imports: [
  ],
  exports: [AngularInputFocusDirective]
})
/**
 * A module for an angular focus directive.
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
export class AngularInputFocusModule { }
