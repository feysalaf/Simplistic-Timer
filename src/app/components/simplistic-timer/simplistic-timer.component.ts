import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simplistic-timer',
  templateUrl: './simplistic-timer.component.html',
  styleUrls: ['./simplistic-timer.component.scss']
})
export class SimplisticTimerComponent implements OnInit {

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

  // TODO: CHANGE OBJECT NAME, TOO CONFUSING WITH ANIMATION OBJECT NAME
  countdownObject = {
    minutes:0,
    seconds:0
  }


  constructor() { }

  ngOnInit(): void {
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
    while(this.stop != true){
      //PASS 1
      if(this.seconds != 0){
        this.seconds--;
        this.countdownObject['seconds'] = this.seconds;

        if(this.seconds === 0 && this.minutes != 0){
          this.seconds = 59;
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
      //fire function every 1s until terminate conditions are reached
      await this.sleep(1000);
    }
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

  ngAfterViewInit(){
        // setTimeout(()=>{this.animate(); },5000);
        // console.log("Beginning timer for: " + this.minutes + ":" + this.seconds);
        setTimeout(()=>{this.StartTimerANDAnimate()},2000);
  }

}
