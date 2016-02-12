'use strict';

var ratelimit = require( './../lib' );

var opts = {
	'token': '<your_token_goes_here>',
	'useragent': 'beep-boop-bop'
};

ratelimit( opts, clbk );

function clbk( error, status ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( status );
}
