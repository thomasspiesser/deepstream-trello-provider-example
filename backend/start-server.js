var PermissionHandler = require( './permission-handler' );
var Deepstream = require( 'deepstream.io' );
var server = new Deepstream();

server.set( 'tcpHost', '0.0.0.0' );
server.set( 'tcpPort', '6022' );
server.set( 'permissionHandler', new PermissionHandler() );

server.start();
