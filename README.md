# ThumbControllers.js
[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]

A library to avoid tons of CSS to make input (type range) available for mobile. 

Also offers vertical and circular versions.

See [example on Codepen](http://codepen.io/Astrak/pen/yYJJXN?editors=0010).

+ Horizontal :
```js
const slider1 = new ThumbControllers.Slider();

container.appendChild( slider1.el );
```
![Simple slider](https://raw.githubusercontent.com/Astrak/ThumbControllers.js/master/slider.png "Simple slider")

+ Vertical :
```js
const slider2 = new ThumbControllers.Slider({ vertical: true });

container.appendChild( slider2.el );
```
![Simple slider](https://raw.githubusercontent.com/Astrak/ThumbControllers.js/master/vert-slider.png "Simple slider")

## Full pattern

Values are default :

```js
const options = {
	color1: '#666',//Ramp + text.
	color2: '#333',//Thumb.
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
- cursor not set to grabbing when grabbing from ramp

[npm-badge]: https://img.shields.io/npm/v/thumbcontrollers.svg
[npm-badge-url]: https://www.npmjs.com/package/thumbcontrollers
[license-badge]: https://img.shields.io/npm/l/thumbcontrollers.svg
[license-badge-url]: ./LICENSE
[dependencies-badge]: https://img.shields.io/david/astrak/thumbcontrollers.js.svg
[dependencies-badge-url]: https://david-dm.org/astrak/thumbcontrollers.js