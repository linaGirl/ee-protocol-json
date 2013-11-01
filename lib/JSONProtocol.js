

	var   Class 		= require( "ee-class" )
		, stream		= require( "stream" )
		, type 			= require( "ee-types" )
		, log 			= require( "ee-log" );



	module.exports = new Class( {
		inherits: stream.Transform


		, buffer: null


		, init: function( outgoing ){
			stream.Transform.call( this, { decodeStrings: false, objectMode: outgoing } );
		}


		, _transform: function( chunk, encoding, done ){

			if ( type.buffer( chunk ) ){
				// from string to object -> incoming
				if ( this.buffer === null ) this.buffer = chunk;
				else this.buffer = Buffer.concat( [ this.buffer, chunk ] );

				this.decode( done );
			}
			else if ( type.object( chunk ) ){
				// from object to string -> outgoing
				var   chunk = new Buffer( JSON.stringify( chunk ) )
					, len 	= new Buffer( 4 );

				len.writeUInt32LE( chunk.length, 0 );

				this.push( Buffer.concat( [ len, chunk ] ) );
				done();
			}
			else throw new Error( "Got input typeof «" + type( chunk ) + "», expected buffer or object!" ).setName( "InvalidArgumentException" );
		}



		, decode: function( done ){
			var len, data, newBuffer;

			if ( this.buffer.length > 4 ){
				len = this.buffer.readInt32LE( 0 );
				if ( this.buffer.length >= 4 + len ){
					try {
						data = JSON.parse( this.buffer.slice( 4, len + 4 ).toString() );
					} catch ( err ){
						throw new Error( "Failed to decode data received, cannot resync!" ).setName( "InvalidDataException" );
					}

					this.push( data );

					newBuffer = new Buffer( this.buffer - 4 - len );
					this.buffer.slice( 4 + len ).copy( newBuffer );
					this.buffer = newBuffer;

					this.decode( done );
				}
				else done();
			}
			else done();
		}
	} );