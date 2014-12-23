

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
