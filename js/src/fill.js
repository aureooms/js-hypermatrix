

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
