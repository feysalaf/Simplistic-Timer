import {  animation, trigger, animateChild, group,
  transition, animate, style, query,state } from '@angular/animations';


export let fade = trigger('fade',[
  state('void',style({opacity:0})),

  // transition('void <=> *',[
  // style({opacity:0}),
  // animate(2200)]),

  transition('* => void',[
  style({opacity:0}),
  animate(2700)])])
