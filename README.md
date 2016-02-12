Rate Limit
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get a user's [rate limit][github-rate-limit] status.


## Installation

``` bash
$ npm install github-user-rate-limit
```


## Usage

``` javascript
var ratelimit = require( 'github-user-rate-limit' );
```

<a name="ratelimit"></a>
#### ratelimit( opts, clbk )

Gets a user's [rate limit][github-rate-limit] status.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

ratelimit( opts, clbk );

function clbk( error, status ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( status );
	/*
		{
			"core": {
				"limit": 5000,
				"remaining": 4999,
				"reset": 1372700873 // UTC seconds
			},
			"search": {
				"limit": 30,
				"remaining": 18,
				"reset": 1372697452 // UTC seconds
			}
		}
	*/
}
```

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token] (*required*).
*	__useragent__: [user agent][github-user-agent] `string`.

To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

ratelimit( opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'useragent': 'hello-github!'
};

ratelimit( opts, clbk );
```


#### ratelimit.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'useragent': 'hello-github!'
};

var get = ratelimit.factory( opts, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`ratelimit()`](#ratelimit).


---
## Examples

``` javascript
var ratelimit = require( 'github-user-rate-limit' );

var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'useragent': 'beep-boop-bop'
};

ratelimit( opts, clbk );

function clbk( error, status ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( status );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain an access [token][github-token] and modify the `token` option accordingly.


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-user-rate-limit
```


### Usage

``` bash
Usage: ghratelimit [options] 

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --token token        Github access token.
  -ua, --useragent ua       User agent.
       --pretty             Pretty format.
```


### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	[Rate limit][github-rate-limit] information is written to `stdout`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghratelimit --token <token>
# => {"core":{...},"search":{...}}
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghratelimit
# => {"core":{...},"search":{...}}
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghratelimit --token <token>
# => {"core":{...},"search":{...}}
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token>
# => {"core":{...},"search":{...}}
```

To pretty format the [rate limit][github-rate-limit] status, set the `pretty` option.

``` bash
$ DEBUG=* ghratelimit --token <token> --pretty
#
# core
#   limit: 5000
#   remaining: 4999
#   reset: 2016-02-12T02:11:34.000Z
#
# search
#   limit: 30
#   remaining: 30
#   reset: 2016-02-12T01:25:28.000Z
#
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-user-rate-limit.svg
[npm-url]: https://npmjs.org/package/github-user-rate-limit

[build-image]: http://img.shields.io/travis/kgryte/github-user-rate-limit/master.svg
[build-url]: https://travis-ci.org/kgryte/github-user-rate-limit

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-user-rate-limit/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-user-rate-limit?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-user-rate-limit.svg
[dependencies-url]: https://david-dm.org/kgryte/github-user-rate-limit

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-user-rate-limit.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-user-rate-limit

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-user-rate-limit.svg
[github-issues-url]: https://github.com/kgryte/github-user-rate-limit/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-get]: https://github.com/kgryte/github-get
[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/