'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var get = require( './../lib/ratelimit.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof get, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when fetching a rate limit status', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/ratelimit.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function ratelimit() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk({
					'status': 404,
					'message': 'beep'
				});
			}
		};
	}

	function done( error ) {
		t.equal( error.status, 404, 'equal status' );
		t.equal( error.message, 'beep', 'equal message' );
		t.end();
	}
});

tape( 'functions returns a rate limit status to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/ratelimit.js', {
		'./factory.js': factory
	});

	expected = results;

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function ratelimit() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
