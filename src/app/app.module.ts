import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SimplisticTimerComponent} from './components/simplistic-timer/simplistic-timer.component';
import {RedCircleTimerComponent} from './components/red-circle-timer/red-circle-timer.component';
import {AnalogTimerComponent} from './components/analog-timer/analog-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SimplisticTimerComponent,
    RedCircleTimerComponent,
    AnalogTimerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
