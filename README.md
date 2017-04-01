# ThumbControllers.js

A library to avoid tons of CSS to make input (type range) available for mobile.

```js
const slider = new ThumbControllers.slider();

container.appendChild( slider.el );

slider.onSlide = value => {
	//Do something.	
};
```

Result : 

## Full pattern

Values are default :

```js
const options = {
	color1: '#666',
	color2: '#333',
	display: true,//Display value on thumb.
	min: 0,
	max: 1,
	value: 0,
	step: 0.01//Must be > 0.
};

const slider = new ThumbControllers.slider( options );

document.body.appendChild( slider.el );
slider.el.style.position = 'absolute';

slider.setValue( 0.5 );

slider.min = -.5;//Options display, min, max and step can be changed further.
```