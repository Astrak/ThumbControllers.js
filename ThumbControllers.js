var ThumbControllers = ThumbControllers || {};

ThumbControllers.slider = function ( options ) {

	this.value = 0;
	this.max = 1;
	this.min = 0;
	this.step = 0.01;//0 = just compute value.
	var color1 = '#666', color2 = '#333';

	if ( options ) {

		this.max = options.max || this.max;
		this.min = options.min || this.min;
		this.step = options.step || this.step;
		color1 = options.color1 || color1;
		color2 = options.color2 || color2;

		update();

	}

	this.onSlide = null;

	var that = this;

	var width = 200, thumbWidth = 50;

	var w = document.createElement( 'div' ),
		ramp = document.createElement( 'div' );
		thumb = document.createElement( 'div' );
		text = document.createElement( 'p' );

	w.appendChild( ramp );
	w.appendChild( thumb );
	thumb.appendChild( text );

	ramp.className = 'pointer';
	thumb.className = 'grab';

	ramp.style.cssText = 'width:' + width + 'px;height:8px;background:' + color1 + ';border-radius:2px;top:50%;margin-top:-4px;position:absolute;';

	thumb.style.cssText = 'width:' + thumbWidth + 'px;height:' + thumbWidth + 'px;overflow:hidden;border-radius:50%;background:' + color2 + ';top:50%;margin-top:-' + thumbWidth / 2 + 'px;position:absolute;box-shadow:0 0 10px;';

	text.style.cssText = 'text-align:center;font-family:sans-serif;font-weight:bold;font-size:medium;color:' + color1 + ';';

	var x0 = false, startValue, offset = 0;

	thumb.addEventListener( 'mousedown', onMouseDown, false );
	thumb.addEventListener( 'touchstart', onMouseDown, false );

	ramp.addEventListener( 'mousedown', onMouseDown, false );
	ramp.addEventListener( 'touchstart', onMouseDown, false );

	window.addEventListener( 'mouseup', onMouseUp, false );
	window.addEventListener( 'touchend', onMouseUp, false );

	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'touchmove', onMouseMove, false );

	this.el = w;

	this.thumb = thumb;

	this.setValue = function ( v ) {

		update( v );

	};

	function update ( v ) {

		var value = typeof v === 'undefined' ? that.value : v;

		computeValue( v );

		thumb.style.left = that.value * ( width - thumbWidth ) + 'px';

		if ( that.onSlide ) that.onSlide( that.value );

	}

	function computeValue ( v ) {

		var value = typeof v === 'undefined' ? that.value : v;

		value = clamp( that.min, that.max, value );

		if ( that.step ) {

			var step = that.step, val = value, m = 0;

			//Convert to integers to avoid floating point operation issues
			if ( val !== parseInt( val ) || step !== parseInt( step ) ) {

				while ( val !== parseInt( val ) || step !== parseInt( step ) ) {

					val *= 10;

					step *= 10;

					m++;

				}

			}

			value = ( val - val % step ) / Math.pow( 10, m );

		}

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

		x0 -= offset;

		var value = ( x0 - thumbWidth / 2 ) / ( width - thumbWidth );

		startValue = clamp( that.min, that.max, value );

		if ( e.target === ramp ) 

			update( startValue );

		return false;

	}

	function onMouseMove ( e ) {

		if ( x0 !== false ) {

			var x = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;

			var delta = ( x - x0 - offset ) / ( width - thumbWidth );

			var value = clamp( that.min, that.max, delta + startValue );

			update( value );

		}

	}

	function onMouseUp () {

		x0 = false;

		offset = 0;

	}

};