
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	roundStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-round', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( roundStream ).to.be.a( 'function' );
	});

	it( 'should round streamed numeric data', function test( done ) {
		var data, expected, rStream;

		// Simulate some data...
		data = [ 10.23434, 1.234, -1.586033, 2.5, 3.0, 4, 4.49999 ];

		// Expected values:
		expected = [ 10, 1, -2, 3, 3, 4, 4 ];

		// Create a new stream:
		rStream = roundStream().stream();

		// Mock reading from the stream:
		utils.readStream( rStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, rStream );
		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});