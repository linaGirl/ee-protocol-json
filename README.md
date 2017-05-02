# ee-protocol-json

[![Greenkeeper badge](https://badges.greenkeeper.io/eventEmitter/ee-protocol-json.svg)](https://greenkeeper.io/)

simple JSON streaming protocol. transmitts & receives JSON objects.

## build status

[![Build Status](https://travis-ci.org/eventEmitter/ee-protocol-json.png?branch=master)](https://travis-ci.org/eventEmitter/ee-protocol-json)

## installation
	
	npm install ee-protocol-json

## usage
	
on the receiving end of the line

	var   JSONProtocolHandler 	= require( "ee-protocol-json" )
		, decoder 				= new JSONProtocolHandler()
		, incomingPacketData 	= new Buffer( [ 15, 0, 0, 0, 7b, 22, 66, 61, 62, 69, 61, 6e, 22, 3a, 22, 74, 68, 65, 20, 6b, 69, 6e, 67, 22, 7d ] );

	decoder.wirte( incomingPacketData );

	decoder.on( "data", function( JSONObject ){
		log( JSONObject ) // { fabian: "the king" }
	} )

on the transmitting end of the line you must pass true to the contructor!
	
	var   JSONProtocolHandler 	= require( "ee-protocol-json" )
		, encoder 				= new JSONProtocolHandler( true )
		, outgoingPacketData 	= new Buffer( { fabian: "the king" } );

	encoder.wirte( outgoingPacketData );

	instance.on( "data", function( data ){
		log( data ) // 15 0 0 0 7b 22 66 61 62 69 61 6e 22 3a 22 74 68 65 20 6b 69 6e 67 22 7d
	} )


