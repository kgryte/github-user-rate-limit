'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var merge = require( 'utils-merge2' )();
var get = require( '@kgryte/github-get' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for fetching a user's rate limit status.
*
* @param {Object} options - function options
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for getting a user's rate limit status
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = merge( {}, defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: ratelimit()
	*	Gets a user's rate limit.
	*
	* @returns {Void}
	*/
	return function ratelimit() {
		get( opts, done );
		/**
		* FUNCTION: done( error, info )
		*	Callback invoked after receiving an API response.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object} info - rate limit info
		* @returns {Void}
		*/
		function done( error, info ) {
			if ( error ) {
				return clbk( error );
			}
			clbk( null, info.resources );
		} // end FUNCTION done()
	}; // end FUNCTION ratelimit()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
