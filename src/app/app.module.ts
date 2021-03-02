import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimplisticTimerComponent } from './components/simplistic-timer/simplistic-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SimplisticTimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
