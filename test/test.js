'use strict';

// MODULES //

var tape = require( 'tape' );
var ratelimit = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof ratelimit, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof ratelimit.factory, 'function', 'export includes a factory method' );
	t.end();
});
