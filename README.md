# Simplistic-Timer

This project contains two timers:

* Simplistic Timer

* Red Circle Timer

Both timers have different aesthetic styles and are made entirely using typescript and svg. This allows for pixel perfect scaling and smooth animations. They are meant to be used as a component in other angular projects. 

<p align="center">
  <img src="https://github.com/feysalaf/Simplistic-Timer/blob/master/docs/readme/SimplisticTimer.png" width="500" height="300">
  <img src="https://github.com/feysalaf/Simplistic-Timer/blob/master/docs/readme/RedCircleTimer.png" width="500" height="300">
</p>
  

## Usage

In order to use the timers simply import them in an angular component. The selectors for the timers are `app-simplistic-timer` and `app-red-circle-timer`. 

```html
<app-simplistic-timer minutes="0" seconds="14"  >
</app-simplistic-timer>
```
## Parameters

The timers take two parameters, `minutes` and `seconds`. The timer works even if no parameter is given.

## Scaling

The best way to use the timer component is to put the timer in a `div` of required size. This is demonstrated here:
```html
<div style="width:375px;height: 812px;">
      <app-simplistic-timer minutes="1" seconds="30">
      </app-simplistic-timer>
</div>
```

The timers automatically detect the width and height of their parent div and expand to fit it. In addition to this the underlying scaling function can be added with the required configuration for some specific display dimensions.

Do **not** pass in `width` and `height` to the `timer component` directly. Always set the parent to required dimensions and the timer will scale automatically.
