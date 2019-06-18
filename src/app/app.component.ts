import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Input Focus Tester';
  showInput = true;
  focus = true;

  delayToggleFocus() {
    this.focus = true;
    setTimeout(() => {
      this.focus = !this.focus;
    }, 1000);
  }
}
