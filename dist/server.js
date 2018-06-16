'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _normalizePort = require('normalize-port');

var _normalizePort2 = _interopRequireDefault(_normalizePort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /* jshint esversion: 6 */
/* jshint ignore: start */

app.use(_express2.default.static('dist'));

var jsonParser = _bodyParser2.default.json();

//app.use( bodyParser.urlencoded({ extended: true }) );
//app.use( bodyParser.json() );

// Database

var mongoDbUserName = 'slank';
var mongoDbUserPassword = 'yoohunfer1';
var mongoDbName = 'web-directory';
var mongoDbUrl = 'mongodb://' + mongoDbUserName + ':' + mongoDbUserPassword + '@ds123728.mlab.com:23728/' + mongoDbName;
console.log(mongoDbUrl);
var mongo = undefined;
_mongodb2.default.MongoClient.connect(mongoDbUrl, function (error, client) {
  if (error) {
    console.error(error);
    return;
  }
  console.log('connection successful');
  mongo = {
    client: client,
    db: client.db(mongoDbName)
  };
});

// Database Collection Names
var categoriesCollectionName = 'categories';

// End Database

// Server

app.get('/api/test', function (request, response) {
  console.log('starting /api/test');
  mongo.db.listCollections().toArray(function (error, result) {
    if (error) {
      console.error(error);
      return;
    }
    response.send({
      username: _os2.default.userInfo().username,
      result: result
    });
  });
});

app.get('/api/getCategories', function (request, response) {
  mongo.db.collection(categoriesCollectionName).find({}, null).toArray(function (error, documents) {
    response.send(documents);
  });
});

app.post('/api/createCategory', jsonParser, function (request, response) {
  console.log('request:');
  console.log(request);
  console.log('request.body:');
  console.log(request.body);
  mongo.db.collection(categoriesCollectionName).insertOne({ name: request.body.categoryName }, null, function (error, result) {
    console.log(result.ops[0]);
    response.send(JSON.stringify(result.ops[0]));
  });
});

// get port from environment and store in Express.
var port = (0, _normalizePort2.default)(process.env.PORT || '8080'); // process.env.PORT lets the port be set by Heroku
app.set('port', port);

app.listen(port, function () {
  return console.log('Listening on port ' + port + '!');
});
