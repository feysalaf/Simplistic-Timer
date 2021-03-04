import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { AppComponent } from './app.component';
import { SimplisticTimerComponent } from './components/simplistic-timer/simplistic-timer.component';
import { RedCircleTimerComponent } from './components/red-circle-timer/red-circle-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SimplisticTimerComponent,
    RedCircleTimerComponent
  ],
  imports: [
    BrowserModule,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
