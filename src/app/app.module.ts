import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularInputFocusModule } from 'projects/angular-input-focus/src/lib/angular-input-focus.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularInputFocusModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
