


	var   Class 		= require( "ee-class" )
		, log 			= require( "ee-log" )
		, assert 		= require( "assert" )
		, Protocol 		= require( "./" )
		, incoming 		= new Protocol()
		, outgoing 		= new Protocol( true )
		, executed 		= false
		, info 			= { fabian: "the king" };


	outgoing.on( "data", function( data ){
		incoming.write( data );
	} );

	incoming.on( "data", function( data ){ 
		assert.deepEqual( data, info, "protocol did not decode the data correctly!" )
		executed = true;
	} );


	outgoing.write( info );


	process.on( "exit", function(){
		assert.ok( executed, "protocol has failed, data was not parsed!" )
	} );