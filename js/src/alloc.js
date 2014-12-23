

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
