'use strict';

// MODULES //

var factory = require( './factory.js' );


// RATE LIMIT STATUS //

/**
* FUNCTION: ratelimit( opts, clbk )
*	Gets a user's rate limit status.
*
* @param {Object} opts - function options
* @param {String} opts.token - Github access token
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function ratelimit( opts, clbk ) {
	factory( opts, clbk )();
} // end FUNCTION ratelimit()


// EXPORTS //

module.exports = ratelimit;
