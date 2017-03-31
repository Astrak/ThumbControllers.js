var ThumbControllers = ThumbControllers || {};

ThumbControllers.slider = function ( options, onSlide ) {

	this.value = 0;
	this.max = 1;
	this.min = 0;
	this.step = 0;//0 = just compute value.

	if ( options ) {

		this.max = options.max || this.max;
		this.min = options.min || this.min;
		this.step = options.step || this.step;
		this.value = options.value || this.value;

	}

	this.onSlide = onSlide;

	var that = this;

	var width = 200, thumbWidth = 50;

	var w = document.createElement( 'div' ),
		ramp = document.createElement( 'span' );
		thumb = document.createElement( 'div' );
		text = document.createElement( 'p' );

	w.appendChild( ramp );
	w.appendChild( thumb );
	thumb.appendChild( text );

	ramp.className = 'pointer';
	thumb.className = 'grab';

	ramp.style.cssText = 'width:' + width + 'px;height:8px;background:#F80;border-radius:2px;top:50%;margin-top:-4px;position:absolute;';

	thumb.style.cssText = 'width:' + thumbWidth + 'px;height:' + thumbWidth + 'px;border-radius:50%;background:#333;top:50%;margin-top:-' + thumbWidth / 2 + 'px;position:absolute;box-shadow:0 0 10px;';

	var x0 = false, startValue, offset = 0;

	thumb.addEventListener( 'mousedown', onMouseDown, false );
	thumb.addEventListener( 'touchstart', onMouseDown, false );

	ramp.addEventListener( 'mousedown', onMouseDown, false );
	ramp.addEventListener( 'touchstart', onMouseDown, false );

	window.addEventListener( 'mouseup', onMouseUp, false );
	window.addEventListener( 'touchend', onMouseUp, false );

	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'touchmove', onMouseMove, false );

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

		startValue = Math.min( 1, Math.max( 0, ( x0 - thumbWidth / 2 ) / ( width - thumbWidth ) ) );

		if ( e.target === ramp ) {

			that.value = startValue;

			thumb.style.left = startValue * ( width - thumbWidth ) + 'px';

			if ( that.onSlide ) that.onSlide( that.value );

		}

		return false;

	}

	function onMouseMove ( e ) {

		if ( x0 !== false ) {

			var x = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;

			var delta = ( x - x0 - offset ) / ( width - thumbWidth );

			that.value = Math.max( that.min, Math.min( that.max, ( delta + startValue ) ) );

			thumb.style.left = that.value * ( width - thumbWidth ) + 'px';

			if ( that.onSlide ) that.onSlide( that.value );

		}

	}

	function onMouseUp () {

		x0 = false;

		offset = 0;

	}

	return w;

};