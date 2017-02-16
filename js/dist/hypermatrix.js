( function ( ) {

'use strict' ;

var definition = function ( exports , undefined ) {


/* js/src/alloc.js */


/**
 * Matrix allocator
 *
 * @param {function} ralloc the row allocator function
 */

var __alloc__ = function ( ralloc ) {

	var alloc ;

	alloc = function ( args , i , last ) {

		var n , a , j ;

		n = args[i] ;

		if ( i === last ) {

			return ralloc( n ) ;

		}

		else {

			a = new Array( n ) ;

			++i;

			for ( j = 0 ; j < n ; ++j ) {
				a[j] = alloc( args , i , last ) ;
			}

		}

		return a ;

	} ;

	return alloc ;

} ;

exports.__alloc__ = __alloc__ ;

/* js/src/fill.js */


/**
 * Matrix filler
 *
 * @param {Array} a matrix pointer
 * @param {any} v value used to fill the matrix
 * @param {int[]} dim list of the size of the different dimensions
 * @param {int} i current index in dim
 * @param {int} last last index to consider in dim
 *
 */


var fill = function ( a , v , dim , i , last ) {

	var n , a , j ;

	n = dim[i] ;

	if ( i === last ) {

		for ( j = 0 ; j < n ; ++j ) {
			a[j] = v ;
		}

	}

	else {

		++i ;

		for ( j = 0 ; j < n ; ++j ) {
			fill( a[j] , v , dim , i , last );
		}

	}

	return a ;

} ;

exports.fill = fill ;

/* js/src/resolve.js */



var resolve = function ( a , dim , i , last ) {

	for ( ; i <= last ; ++i ) {

		a = a[args[i]] ;

	}

	return a ;

} ;

exports.resolve = resolve ;

/* js/src/transpose.js */


/**
 * Matrix transposer
 * @param {int[]} dim dimensions size array
 * @param {int[]} map the transposition map
 * @param {int[]} index storage array used to resolve matrix indices
 */


var transpose = function ( a , dim , i , last , map , index , b ) {

	var n , j , k ;

	n = dim[i] ;
	k = map[i] ;

	if ( i === last ) {

		for ( j = 0 ; j < n ; ++j ) {
			index[k] = j ;
			b[j] = resolve( a , index , 0 , index.length - 1 ) ;
		}

	}

	else {

		++i ;

		for ( j = 0 ; j < n ; ++j ) {
			index[k] = j ;
			transpose( a , dim , i , last , map , index , b[j] ) ;
		}
	}

} ;

exports.transpose = transpose ;

return exports ;
} ;
if ( typeof exports === "object" ) {
	definition( exports ) ;
}
else if ( typeof define === "function" && define.amd ) {
	define( "@aureooms/js-hypermatrix" , [ ] , function ( ) { return definition( { } ) ; } ) ;
}
else if ( typeof window === "object" && typeof window.document === "object" ) {
	definition( window["hypermatrix"] = { } ) ;
}
else console.error( "unable to detect type of module to define for @aureooms/js-hypermatrix") ;
} )( ) ;
