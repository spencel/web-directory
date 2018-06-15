/* jshint esversion: 6 */
/* jshint ignore: start */

import mongodb from 'mongodb';

( async () => {
	var mongoDbUserName = 'slank';
	var mongoDbUserPassword = 'yoohunfer1';
	var mongoDbName = 'web-directory';
	var mongoDbUrl = `mongodb://${mongoDbUserName}:${mongoDbUserPassword}@ds123728.mlab.com:23728/${mongoDbName}`;
	var mongo = await new Promise( ( resolve, reject ) => {
		mongodb.MongoClient.connect( mongoDbUrl, ( error, client ) => {
			if ( error ) { console.error( error ); return; }
			resolve({
				client: client,
				db: client.db( mongoDbName )
			});	
		});
	});
	//await mongo.db.createCollection( 'categories' );
	await mongo.db.collection( 'categories' ).insertOne(
		{ 'name': 'chemistry' }
	);
	console.log( await mongo.db.listCollections().toArray() );
	await mongo.client.close();
})();

