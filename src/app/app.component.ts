import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Input Focus Tester';
  showInput = true;
  focus = true;
  focusEvent = new EventEmitter<boolean>();

  delayToggleFocus() {
    this.focusEvent.emit(true);
    setTimeout(() => {
      this.focusEvent.emit(false);
    }, 1000);
  }
}
