'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );
var raw = require( './fixtures/raw.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof factory, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		factory( null, noop );
	}
	function bar() {
		factory( {'token':1234}, noop );
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( opts, value );
		};
	}
});

tape( 'function throws if not provided a token', function test( t ) {
	t.throws( foo, Error, 'requires a token' );
	t.end();

	function foo() {
		factory( {'useragent':'beep'}, noop );
	}
});

tape( 'function returns a function', function test( t ) {
	t.equal( typeof factory( getOpts(), noop ), 'function', 'returns a function' );
	t.end();
});

tape( 'function returns a function which returns an error to a provided callback if an error is encountered when fetching a rate limit status', function test( t ) {
	var factory;
	var opts;
	var get;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': resolve
	});

	opts = getOpts();
	get = factory( opts, done );
	get();

	function resolve( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk({
				'status': 404,
				'message': 'beep'
			});
		}
	}

	function done( error ) {
		t.equal( error.status, 404, 'equal status' );
		t.equal( error.message, 'beep', 'equal message' );
		t.end();
	}
});

tape( 'function returns a function which returns a rate limit status to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var get;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': resolve
	});

	expected = results;

	opts = getOpts();
	get = factory( opts, done );
	get();

	function resolve( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, raw );
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
