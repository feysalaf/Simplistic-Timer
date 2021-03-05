# Simplistic-Timer

This project contains two timers:

* Simplistic Timer

* Red Circle Timer

Both timers have different aesthetic styles. They are meant to be used as a component in other angular projects. 
<p align="center">
  <img src="https://github.com/feysalaf/Simplistic-Timer/blob/master/docs/readme/SimplisticTimer.png" width="1920" height="450"  title="hover text">
</p>
<p align="center">
  <img src="https://github.com/feysalaf/Simplistic-Timer/blob/master/docs/readme/RedCircleTimer.png" width="1920" height="550"  title="hover text">
</p>


## Usage

In order to use the timers simply import them in an angular component. The selectors for the timers are `app-simplistic-timer` and `app-red-circle-timer`. 

```
<app-simplistic-timer minutes="0" seconds="14"  >
</app-simplistic-timer>
```
## Parameters

The timers take two parameters, `minutes` and `seconds`. The timer works even if no parameter is given.

## Scaling

The best way to use the timer component is to put the timer in a `div` of required size. The timers automatically detect the width and height of their parent div and expand to fit it. In addition to this the underlying scaling function can be added with the required configuration for some specific display dimensions.
