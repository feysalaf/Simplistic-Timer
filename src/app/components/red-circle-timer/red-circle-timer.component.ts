import { Component, OnInit, Input, ViewChild , ElementRef } from '@angular/core';
  @Component({
  selector: 'app-red-circle-timer',
  templateUrl: './red-circle-timer.component.html',
  styleUrls: ['./red-circle-timer.component.scss'],
 })
export class RedCircleTimerComponent implements OnInit {

  //getting div dimensions
  @ViewChild('svgDiv')

  svgDiv: ElementRef;

  //viewBox properties
  viewBoxDimensions:string = '-90 42 391 198';
  //default

  svgConfig = {
    fillSmall: '2 42 211 198',
    fillLarge: '-90 42 391 198'
  }

  parentDivDimensions = {
    width:0,
    height:0
  }

  fitAndScale(){
    //get the current parent div dimensions
    this.parentDivDimensions.width = this.svgDiv.nativeElement.offsetWidth;
    this.parentDivDimensions.height = this.svgDiv.nativeElement.offsetHeight;

    //if parent div width > 1300 push big config else small
    if(this.parentDivDimensions.width > 1300 && this.parentDivDimensions.height > 500){
      this.viewBoxDimensions = this.svgConfig.fillLarge;
     }
    else if(this.parentDivDimensions.width < 1000 && this.parentDivDimensions.height < 1000){
      this.viewBoxDimensions = this.svgConfig.fillSmall;
     }
  }

  tabcheck = false;

  isHidden(){
    document.addEventListener(
      "visibilitychange"
        , () => {
          if (document.hidden) {
               this.tabcheck = true;
          }else{
               this.tabcheck = false;
            }
          }
        );

  }


  ngOnInit(): void {
  }
  ngAfterViewInit(){
        setTimeout(()=>{
                        this.isHidden();
                        this.fitAndScale();
                        this.StartTimerANDAnimate()}
        ,1);
      }
  //this is a data object used to hold all the
  //data for communication between html and ts
  //it passes by reference and hence value changes
  //in any method are implemented to the actual variable
  //We cannot use variables on their own since
  //in javascript/typescript primitive variables
  //are passed by value
  //450 is full arc length
  timerObject = {
    dasharray:450,
    dashoffset:0,
  }

  //takes input from parent component
  //set default values to 0 if no parameters are given
  //in this way if the user only enters seconds value
  //then the program wouldn't give errors and set minutes to 0 by default
  @Input() minutes:number = 0;
  @Input() seconds:number = 0;
  stop = false;
  showzero = false;

  // TODO: CHANGE OBJECT NAME, TOO CONFUSING WITH ANIMATION OBJECT NAME
  countdownObject = {
    minutes:0,
    seconds:0
  }

  constructor() { }
 
  //show zeros method activates only if seconds < 9 else it stays false
  //turning output to true will show the zeros in the timer
  showZeroes(){
    this.showzero = true;
   }
  hideZeroes(){
    this.showzero = false;
   }

  //countdown helper methods
  async sleep(ms: number) {
     await new Promise(resolve => setTimeout(()=>resolve(), ms)).then();
  }

  //countdown method
  async startTimer(){
    //set current values before starting
    this.countdownObject['minutes'] = this.minutes;
    this.countdownObject['seconds'] = this.seconds;
    //keep routine running unless stop is true
    let timer = setInterval(()=>{
          if(this.stop == true){
            clearInterval(timer);
          }
          else if(this.tabcheck == false){
          //PASS 1
          if(this.seconds != 0){
            this.seconds--;
            if(this.seconds < 10){
              this.showZeroes();
            }
            else if(this.seconds > 10){
              this.hideZeroes();
            }
            this.countdownObject['seconds'] = this.seconds;

            if(this.seconds === 0 && this.minutes != 0){
              this.seconds = 59;
              if(this.seconds < 10){
                this.showZeroes();
              }
              else if(this.seconds > 10){
                this.hideZeroes();
              }
              this.countdownObject['seconds'] = this.seconds;
              this.minutes--;
              this.countdownObject['minutes'] = this.minutes;
            }
            else if(this.seconds === 0 && this.minutes === 0 ){
              this.stop = true;
            }
          }
          //PASS 2
          else if(this.seconds === 0 && this.minutes != 0){
            this.seconds = 59;
            this.minutes--;
            this.countdownObject['minutes'] = this.minutes;

          }
          //PASS 3
          else if(this.seconds === 0 && this.minutes === 0){
            this.stop = true;
            return;
          }
          else if(this.stop){
          }
    }},1000);

  }


  //this method is used to allow usage of the animate function
  //using values between 0 and 100
  //It's simple normalization
  NormalizeToScale(input:number,max:number,scale:number){
    return (max - ((max*input)/scale) );
  };

  //solved for 0.1522
  //0.1522 is the optimum step for 1 min
  //here transformationfactor is found by solving
  //the equation for 0.1522
  GenerateStepSize(input_seconds:number){
    let scaledseconds = input_seconds - 0.7;
    let transformationfactor:number = 0.02029;
    return ((450/scaledseconds) * transformationfactor);
  }

  //here parameter_name is the parameter that we would want to access
  //in the timerObject data structure
  //this is the main method used for animating the svg
  //here step value defines how quickly or slowly the timer works
  animate_timer_reversed(i:number,f:number,seconds:number,parameter_name:string){
      //here i is where to start the progress
      //and f is where to end it
      let start;
      let end;
      let step_value;
      step_value = this.GenerateStepSize(seconds);
      // console.log(step_value);
      start      = this.NormalizeToScale(i,450,100);
      end        = this.NormalizeToScale(f,450,100);
      // console.log("Start is: "+ start);
      // console.log("End is: "+ end);
      let animateprogress = setInterval(()=>{
        // console.log("Current param value is: " + end)
          if(end==-450 || end < -450){
            clearInterval(animateprogress);
          }
          else{
            end = end - step_value;
            //the check here makes sure that if step value overflows
            //the arc length then no additional rendering is done
            //timer cannot go beyond the 0 after ending
            if(end <-450){
              clearInterval(animateprogress);
            }
            else{
            this.timerObject[parameter_name] = end;
            }
          }
      },20);
    }
  //here passing in parameters to the method allows
  //generalization, the same method can be used with
  //any n number of variables
  animate(){
        var dashoffset:string = 'dashoffset';
        this.animate_timer_reversed(0,100,1120,dashoffset);
  }

  //for testing, the timer runs 5 seconds after the page is load
  //html has a lot of clutter since everything is in svg,
  //but after testing we only need the progress circle to be
  //in svg format

  ConvertTimetoSeconds(minutes:number,seconds:number){
    let timeInSeconds = 0;
    timeInSeconds = +(this.minutes * 60) + +(this.seconds);
    return timeInSeconds;
  }
  //Sync up countdown timer firing and animation of svg
  StartTimerANDAnimate(){
    var dashoffset:string = 'dashoffset';
    //process total seconds before starting timer
    let seconds = this.ConvertTimetoSeconds(this.minutes,this.seconds);
    this.animate_timer_reversed(0,100,seconds,dashoffset);
    this.startTimer();
  }


}
