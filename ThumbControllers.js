var ThumbControllers = ThumbControllers || {};

ThumbControllers.Slider = function ( options ) {

	var that = this;

	var width = 200, 
		thumbWidth = 50, 
		vertical,
		color1 = '#666', 
		color2 = '#333',
		onChange = null;

	var x0 = false, startValue, offset = 0,
		thumbValue = 0;//CSS positioning between 0 and 1.

	var w = document.createElement( 'div' ),
		ramp = document.createElement( 'div' ),
		thumb = document.createElement( 'div' ),
		text = document.createElement( 'p' );

	this.value = 0;
	this.max = 1;
	this.min = 0;
	this.step = 0.01;
	this.display = true;

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
		vertical = options.vertical;

	}

	ramp.style.cssText = 'position:absolute;border-radius:2px;background:' + color1 + ';';
	ramp.style.cssText += vertical ? 'height:' + width + 'px;width:8px;top:50%;margin-left:-4px;' : 'width:' + width + 'px;height:8px;top:50%;margin-top:-4px;';

	thumb.style.cssText = 'overflow:hidden;position:absolute;box-shadow:0 0 10px;background:' + color2 + ';border-radius:50%;';
	thumb.style.cssText += vertical ? 'height:' + thumbWidth + 'px;width:' + thumbWidth + 'px;left:50%;margin-left:-' + thumbWidth / 2 + 'px;' : 'width:' + thumbWidth + 'px;height:' + thumbWidth + 'px;top:50%;margin-top:-' + thumbWidth / 2 + 'px;';

	text.style.cssText = 'text-align:center;font-family:sans-serif;font-weight:bold;font-size:medium;color:' + color1 + ';';

	update();

	this.el = w;

	this.onChange = function ( f ) {

		onChange = f;

	};

	this.setValue = function ( v ) {

		v = ( v - that.min ) / ( that.max - that.min );

		update( v );

	};

	function update ( v ) {

		var value = typeof v === 'undefined' ? that.value : v;

		computeValue( value );

		if ( vertical ) 

			thumb.style.top = thumbValue * ( width - thumbWidth ) + 'px';

		else 

			thumb.style.left = thumbValue * ( width - thumbWidth ) + 'px';

		if ( that.display ) 

			text.textContent = that.value;

		if ( onChange ) 

			onChange( that.value );

	}

	function computeValue ( v ) {

		var value = typeof v === 'undefined' ? that.value : v;

		value = clamp( 0, 1, value );

		thumbValue = vertical ? 1 - value : value;

		value = value * ( that.max - that.min ) + that.min;

		var step = that.step, val = value, m = 0;

		//Convert to integers to avoid floating point operation issues.
		if ( val !== parseInt( val ) || step !== parseInt( step ) ) {

			while ( val !== parseInt( val ) || step !== parseInt( step ) ) {

				val *= 10;

				step *= 10;

				m++;

				if ( m > 5 ) {//Not much sense to go further of even 2 actually.. ?

					val = parseInt( val );

					step = parseInt( step );

				}

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

			offset += vertical ? ref.offsetTop : ref.offsetLeft;

			ref = ref.offsetParent;

		}

		if ( vertical ) {
			
			x0 = !! e.touches ? e.touches[ 0 ].clientY : e.clientY;

			startValue = 1 - ( x0 - offset - thumbWidth / 2 ) / ( width - thumbWidth );

		} else {

			x0 = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;

			startValue = ( x0 - offset - thumbWidth / 2 ) / ( width - thumbWidth );

		}

		if ( e.target === ramp ) 

			update( startValue );

		return false;

	}

	function onMouseMove ( e ) {

		if ( x0 !== false ) {

			var x, value;

			if ( vertical ) {
				
				x = !! e.touches ? e.touches[ 0 ].clientY : e.clientY;

				value = startValue - ( x - x0 ) / ( width - thumbWidth );

			} else {

				x = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;

				value = startValue + ( x - x0 ) / ( width - thumbWidth );

			}

			update( value );

		}

	}

	function onMouseUp () {

		x0 = false;

		offset = 0;

	}

};