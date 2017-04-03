# ThumbControllers.js
[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]

A collection of 3 types sliders to replace inputs of type range on mobile.

```js
const horizontalSlider = new ThumbControllers.Slider();
const verticalSlider = new ThumbControllers.Slider({ vertical: true });
const circularSlider = new ThumbControllers.CircularSlider();
```
![ThumbControllers.js](https://raw.githubusercontent.com/Astrak/ThumbControllers.js/master/sliders.png "ThumbControllers.js")

Codepen examples :

+ [Horizontal slider](http://codepen.io/Astrak/pen/yYJJXN?editors=0010).
+ [Circular slider](http://codepen.io/Astrak/pen/NGRRwN?editors=0010).

## Full pattern

Values are default :

```js
const options = {
	color1: '#666',//Ramp + text.
	color2: '#333',//Thumb.
	color3: '#111',//Circular slider : color of the empty part of the ramp.
	display: true,//Display value on thumb.
	min: 0,
	max: 1,
	value: 0,
	step: 0.01,//Must be > 0.
	width: 200,//In pixels.
	thumbWidth: 50,
	vertical: false
};

const slider = new ThumbControllers.Slider( options );

document.body.appendChild( slider.el );

slider.setValue( 0.5 );

slider.value;//.5

slider.min = -.5;//Options display, min, max and step can be changed further.

slider.onChange( value => {
	//Do something.	
});
```

## Roadmap
- count step from min
- move to rounded step not floored step
- step proportionnal to passed min/max !
- cursor not set to grabbing when grabbing from ramp

[npm-badge]: https://img.shields.io/npm/v/thumbcontrollers.svg
[npm-badge-url]: https://www.npmjs.com/package/thumbcontrollers
[license-badge]: https://img.shields.io/npm/l/thumbcontrollers.svg
[license-badge-url]: ./LICENSE
[dependencies-badge]: https://img.shields.io/david/astrak/thumbcontrollers.js.svg
[dependencies-badge-url]: https://david-dm.org/astrak/thumbcontrollers.js