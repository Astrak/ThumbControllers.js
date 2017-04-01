# ThumbControllers.js

A library to avoid tons of CSS to make input (type range) available for mobile.

```js
const slider = new ThumbControllers.Slider();

container.appendChild( slider.el );

slider.onSlide = value => {
	//Do something.	
};
```

Result : 

![Simple slider](https://raw.githubusercontent.com/Astrak/ThumbControllers.js/master/slider.png "Simple slider")

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
	thumbWidth: 50
};

const slider = new ThumbControllers.Slider( options );

document.body.appendChild( slider.el );

slider.el.style.position = 'absolute';

slider.setValue( 0.5 );

slider.min = -.5;//Options display, min, max and step can be changed further.
```

## Roadmap

- count step from min
- move to rounded step not floored step
- cursor not set to grabbing when grabbing from ramp