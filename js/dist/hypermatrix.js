(function(exports, undefined){

	'use strict';


/* js/src/fill.js */


/**
 * Matrix filler
 *
 * @param {Array} a matrix pointer
 * @param {any} v value used to fill the matrix
 * @param {int[]} args list of the size of the different dimensions
 * @param {int} i current index in args
 * @param {int} last last index to consider in args
 *
 */


var fill = function(a, v, args, i, last) {
	var n, a, j;
	n = args[i];

	if (i === last) {
		for (j = 0; j < n; ++j) {
			a[j] = v;
		}
	}
	else {
		++i;
		for (j = 0; j < n; ++j) {
			fill(a, v, args, i, last);
		}
	}

	return a;
};

exports.fill = fill;

/* js/src/matrix.js */


/**
 * Matrix builder
 *
 * @param {function} alloc the allocator function
 */

var __matrix__ = function (alloc) {

	var wrap = function () {

		if (arguments.length === 0) {
			return null;
		}

		return matrix(arguments, 0, arguments.length - 1);

	};

	var matrix = function(args, i, last) {
		var n, a, j;
		n = args[i];

		if (i === last) {
			return alloc(n);
		}
		else {
			a = new Array(n);
			++i;

			for (j = 0; j < n; ++j) {
				a[j] = matrix(args, i, last);
			}
		}

		return a;
	};

	return wrap;
};

exports.__matrix__ = __matrix__;

/* js/src/resolve.js */



var resolve = function (a, args) {
	var i, len;

	len = args.length;

	for (i = 1; i < len; ++i) {
		a = a[args[i]];
	}

	return a;

};

exports.resolve = resolve;

/* js/src/transpose.js */


/**
 * Matrix transposer
 */


var transpose = function(a, b, args, map, index, i, last) {
	var n, a, j, k;
	n = args[i];
	k = map[i];

	if (i === last) {
		for (j = 0; j < n; ++j) {
			index[k] = j;
			a[j] = resolve(b, index);
		}
	}
	else {
		++i;
		for (j = 0; j < n; ++j) {
			index[k] = j;
			transpose(a, b, args, map, index, i, last);
		}
	}
};

exports.transpose = transpose;

})(typeof exports === 'undefined' ? this['hypermatrix'] = {} : exports);
