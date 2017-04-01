var ThumbControllers = ThumbControllers || {};

ThumbControllers.Slider = function ( options ) {

	var that = this;

	var width = 200, thumbWidth = 50;

	var x0 = false, startValue, offset = 0,
		thumbValue = 0;//CSS positioning between 0 and 1.

	var w = document.createElement( 'div' ),
		ramp = document.createElement( 'div' );
		thumb = document.createElement( 'div' );
		text = document.createElement( 'p' );

	this.value = 0;
	this.max = 1;
	this.min = 0;
	this.step = 0.01;
	this.display = true;

	this.onSlide = null;

	var color1 = '#666', 
		color2 = '#333';

	w.appendChild( ramp );
	w.appendChild( thumb );
	thumb.appendChild( text );

	var style = document.createElement( 'style' );

	document.head.appendChild( style );

	style.sheet.insertRule( '.grab{cursor:grab;cursor:-webkit-grab;cursor:-moz-grab;}', 0 );
	style.sheet.insertRule( '.grab:active{cursor:grabbing;cursor:-webkit-grabbing;cursor:-moz-grabbing;}', 0 );

	ramp.className = thumb.className = 'grab';

	thumb.addEventListener( 'mousedown', onMouseDown, false );
	thumb.addEventListener( 'touchstart', onMouseDown, false );

	ramp.addEventListener( 'mousedown', onMouseDown, false );
	ramp.addEventListener( 'touchstart', onMouseDown, false );

	window.addEventListener( 'mouseup', onMouseUp, false );
	window.addEventListener( 'touchend', onMouseUp, false );

	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'touchmove', onMouseMove, false );

	if ( options ) {

		this.max = typeof options.max === 'undefined' ? this.max : options.max;
		this.min = typeof options.min === 'undefined' ? this.min : options.min;
		this.step = typeof options.step === 'undefined' ? this.step : options.step;
		this.value = typeof options.value === 'undefined' ? this.value : options.value;
		this.display = typeof options.display === 'undefined' ? this.display : options.display;

		width = typeof options.width === 'undefined' ? width : options.width;
		thumbWidth = typeof options.thumbWidth === 'undefined' ? thumbWidth : options.thumbWidth;
		color1 = options.color1 || color1;
		color2 = options.color2 || color2;

	}

	ramp.style.cssText = 'width:' + width + 'px;height:8px;background:' + color1 + ';border-radius:2px;top:50%;margin-top:-4px;position:absolute;';

	thumb.style.cssText = 'width:' + thumbWidth + 'px;height:' + thumbWidth + 'px;overflow:hidden;border-radius:50%;background:' + color2 + ';top:50%;margin-top:-' + thumbWidth / 2 + 'px;position:absolute;box-shadow:0 0 10px;';

	text.style.cssText = 'text-align:center;font-family:sans-serif;font-weight:bold;font-size:medium;color:' + color1 + ';';

	update();

	this.el = w;

	this.setValue = function ( v ) {

		update( v );

	};

	function update ( v ) {

		var value = typeof v === 'undefined' ? that.value : v;

		computeValue( value );

		thumb.style.left = thumbValue * ( width - thumbWidth ) + 'px';

		if ( that.display ) 

			text.textContent = that.value;

	}

	function computeValue ( v ) {

		var value = typeof v === 'undefined' ? that.value : v;

		value = clamp( 0, 1, value );

		thumbValue = value;

		value = value * ( that.max - that.min ) + that.min;

		var step = that.step, val = value, m = 0;

		//Convert to integers to avoid floating point operation issues.
		if ( val !== parseInt( val ) || step !== parseInt( step ) ) {

			while ( val !== parseInt( val ) || step !== parseInt( step ) ) {

				val *= 10;

				step *= 10;

				m++;

			}

		}

		value = ( val - val % step ) / Math.pow( 10, m );

		that.value = value;

	}

	function clamp ( min, max, v ) {

		return Math.min( max, Math.max( min, v ) );

	}

	function onMouseDown ( e ) {

		e.preventDefault();

		e.stopPropagation();

		var ref = w;

		while ( ref ) {

			offset += ref.offsetLeft;

			ref = ref.offsetParent;

		}

		x0 = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;

		startValue = ( x0 - offset - thumbWidth / 2 ) / ( width - thumbWidth );

		if ( e.target === ramp ) 

			update( startValue );

		if ( that.onSlide ) 

			that.onSlide( that.value );

		return false;

	}

	function onMouseMove ( e ) {

		if ( x0 !== false ) {

			var x = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;

			var value = startValue + ( x - x0 ) / ( width - thumbWidth );

			update( value );

			if ( that.onSlide ) 

				that.onSlide( that.value );

		}

	}

	function onMouseUp () {

		x0 = false;

		offset = 0;

	}

};