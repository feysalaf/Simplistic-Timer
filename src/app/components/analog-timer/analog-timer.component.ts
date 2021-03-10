import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-analog-timer',
  templateUrl: './analog-timer.component.html',
  styleUrls: ['./analog-timer.component.scss']
})
export class AnalogTimerComponent {

  public readonly majorSteps = 12;
  public readonly minorSteps = 60;

  public readonly position = new BehaviorSubject<number>(0);


  public get minors(): number[] {
    return new Array(this.minorSteps);
  }

  public get majors(): number[] {
    return new Array(this.majorSteps);
  }

  public get captionText(): string {
    // if (this.timer.isFinished) {
    //   return this.settingsService.settings?.endText;
    // }
    // if (this.timer.isRunning) {
    //   return null;
    // }
    // if (this.settingsService.settings?.autoStart) {
    //   return null;
    // }
    //
    // return this.settingsService.settings?.startText;
    return 'test';
  }

  // public constructor(public readonly timer: TimerService,
  //                    public readonly settingsService: TimerSettingsService,
  //                    public readonly settingsPreviewService: TimerSettingsPreviewService) {
  //
  //   this.settingsService.settings$.subscribe(() => this.updatePosition())
  //   this.timer.onTick.subscribe(() => this.updatePosition());
  //   this.timer.onReset.subscribe(() => this.updatePosition());
  // }

  public getHighlightMinor(index: number): boolean {

    const position = this.calcPosition();

    return position <= index * 360 / 60;
  }

  public getHighlightMajor(index: number): boolean {

    const position = this.calcPosition();

    if (index === 0 && position < 360) {
      return true;
    }

    return position <= index * 360 / 12;
  }

  private updatePosition(): void {
    this.position.next(this.calcPosition());
  }

  public calcPosition(): number {
    // let position = 0;
    //
    // if (this.timer.totalSeconds <= 60) {
    //
    //   position = 360 - (this.timer.remainingSeconds * (360 / 60));
    //
    // } else if (this.timer.totalSeconds > 60) {
    //
    //   position = 360 - (this.timer.remainingSeconds * (360 / (60 * 60)));
    // }
    //
    // if (isNaN(position)) {
    //   position = 0;
    // }

    return 90;

    // return position;
  }

  public getForegroundColor(): string {
    // const bgColor = (this.settingsPreviewService.backgroundColor.value
    //   ?? this.settingsService.settings.backgroundColor
    //   ?? '#ffffff');
    //
    // const bgHsv = rgbToHsv(hexToRgb(bgColor));
    //
    // if (bgHsv.v <= .35) {
    //   return '#ccc';
    // } else if (bgHsv.v < .5) {
    //   return '#fff';
    // } else if (bgHsv.v < .65) {
    //   return '#000';
    // } else {
    //   return '#333';
    // }

    return '#333';
  }

  // public getMinorTickColor(): string {
  //   const bgColor = (this.settingsPreviewService.backgroundColor.value
  //     ?? this.settingsService.settings.backgroundColor
  //     ?? '#ffffff');
  //
  //   const bgHsv = rgbToHsv(hexToRgb(bgColor));
  //
  //   if (bgHsv.v > .35 && bgHsv.v < .5) {
  //     return '#ddd';
  //   } else if (bgHsv.v < .65) {
  //     return '#eee';
  //   }
  //   return null;
  // }

  // private isLight(): boolean {
  //   const bgColor = (this.settingsPreviewService.backgroundColor.value
  //     ?? this.settingsService.settings.backgroundColor
  //     ?? '#ffffff');
  //
  //   const hex = bgColor.replace('#', '');
  //   const c_r = parseInt(hex.substr(0, 2), 16);
  //   const c_g = parseInt(hex.substr(2, 2), 16);
  //   const c_b = parseInt(hex.substr(4, 2), 16);
  //   const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  //   return brightness > 155;
  // }
}
