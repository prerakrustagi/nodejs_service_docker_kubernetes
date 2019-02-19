var express = require('express');
var bodyParser = require('body-parser');

// Setup Core Route Handlers
var tokenRoute = require('./api/routes/token');
var managementRoute = require('./api/routes/management');

// WEB CONSTRUCTOR
// Web (or WEB) represents the main "server" process of the microservice
// Expects 1 parameters: the APP instance (business logic and shared code
// with WORKER)


var web = express();

// Setup CORS headers
web.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
             'Content-Type, accept, Authorization');
  res.header('Access-Control-Allow-Methods',
             'GET, PUT, OPTIONS, POST, DELETE');

  // Intercepts OPTIONS method
  if(req.method === 'OPTIONS') { res.send(); }
  else { next(); }
});

// Parse JSON body
web.use(bodyParser.json());


// Request logger setup
web.use(function(req, res, next) {
  var logContext = {};
      logContext.request_id = req.headers['X-Request-ID'] ||
                              req.headers['x-request-id'] || uuid.v4();
  req.log = app.syslog.child(logContext);
  next();
});

// Map the Core Route Handlers
web
  .use('/management', managementRoute(app))
  .use('/auth', tokenRoute(app));

// No path found
web.use(function(req, res, next) {
  var errInternalInfo = {
    method: req.method, uri: req.url, query: req.query,
    body: req.body, authorization: req.headers.authorization,
    statusCode: 404
  };

  next(notFoundError);
});

// Generic Error handler (catch all)
web.use(function(err, req, res, next) {
  if(res.statusCode && res.statusCode === 200) {
    res.status(err.statusCode || err.code || 500);
  }
  res.send(err);
});
