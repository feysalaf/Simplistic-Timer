import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; //for animations
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
