const restifyError = require('restify-errors')
const restifyValidator = require('restify-validator');
const jwtHelper = require('./helpers/jwt');

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['Authorization', 'Content-Type'],
  exposeHeaders: ['API-Token-Expiry']
})

const init = (server, restify) => {
  // Middleware para validar token

  server.pre(cors.preflight);
  server.use(cors.actual);

  server.use((req, res, next) => {
    next();
    /*if (req.url === '/v1/auth/authenticate') {
      next();
      return;
    }
    const token = req.header('Authorization');
    if (token) {
      jwtHelper
        .verify(token)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch(() => {
          res.send(new restifyError.UnauthorizedError());
        })
    } else {
      res.send(new restifyError.UnauthorizedError());
    } */
  });

  server.defaultResponseHeaders = (data) => {
    this.header('Content-Type', 'application/json');
  };

  server.use(restify.plugins.bodyParser({}));
  server.use(restifyValidator);

  /* server.use(restify.plugins.fullResponse());
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.authorizationParser());
  server.use(restify.plugins.dateParser());
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.jsonp());
  server.use(restify.plugins.gzipResponse());

  */
  server.use(restify.plugins.throttle({
    burst: 100,
    rate: 50,
    ip: true,
    overrides: {
      '192.168.1.1': {
        rate: 0,
        burst: 0
      }
    }
  }));


  server.use(restify.plugins.conditionalRequest());

  server.on('restifyError', (req, res, err, callback) => {
    err.toJSON = function customToJSON() {
      return {
        name: err.name,
        message: err.message
      };
    };
    err.toString = function customToString() {
      return 'i just want a string';
    };
    return callback();
  });

  /*
  server.get('/', function(req, res, next) {
      res.send(x);  // this will cause a ReferenceError
      return next();
  });
  */

  server.on('uncaughtException', (req, res, route, err) => {
    // this event will be fired, with the error object from above:
    // ReferenceError: x is not defined
  });
}

exports.set = init;
