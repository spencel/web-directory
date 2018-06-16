/* jshint esversion: 6 */
/* jshint ignore: start */

import express from 'express';
import os from 'os';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import http from 'http';
import normalizePort from 'normalize-port';

const app = express();

app.use( express.static( 'dist' ));

const jsonParser = bodyParser.json();

//app.use( bodyParser.urlencoded({ extended: true }) );
//app.use( bodyParser.json() );

// Database

var mongoDbUserName = 'slank';
var mongoDbUserPassword = 'yoohunfer1';
var mongoDbName = 'web-directory';
var mongoDbUrl = `mongodb://${mongoDbUserName}:${mongoDbUserPassword}@ds123728.mlab.com:23728/${mongoDbName}`;
console.log( mongoDbUrl );
var mongo = undefined;
mongodb.MongoClient.connect(
  mongoDbUrl,
  ( error, client ) => {
    if ( error ) {
      console.error( error );
      return;
    }
    console.log( 'connection successful' );
    mongo = {
      client: client,
      db: client.db( mongoDbName )
    };
  }
);

// Database Collection Names
const categoriesCollectionName = 'categories';

// End Database

// Server

app.get( '/api/test', ( request, response ) => {
  console.log( 'starting /api/test' );
  mongo.db.listCollections().toArray(( error, result ) => {
    if ( error ) {
      console.error( error );
      return;
    }
    response.send({
      username: os.userInfo().username,
      result: result
    });
  });
});

app.get( '/api/getCategories', ( request, response ) => {
  mongo.db
    .collection( categoriesCollectionName )
    .find({}, null )
    .toArray(( error, documents ) => {
      response.send( documents );
    });
});

app.post( '/api/createCategory', jsonParser, ( request, response ) => {
  console.log( 'request:' );
  console.log( request );
  console.log( 'request.body:' );
  console.log( request.body );
  mongo.db
    .collection( categoriesCollectionName )
    .insertOne({ name: request.body.categoryName }, null, ( error, result ) => {
      console.log( result.ops[0] );
      response.send( JSON.stringify( result.ops[0] ));
    });
});

// get port from environment and store in Express.
var port = normalizePort( process.env.PORT || '8080' ); // process.env.PORT lets the port be set by Heroku
app.set( 'port', port );

app.listen( port, () => console.log( `Listening on port ${port}!` ));
