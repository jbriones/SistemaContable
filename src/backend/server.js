require('dotenv').config({ path: 'env.env' });
const db = require('./helpers/connectionDb');
const restify = require('restify');
const routes = require('./routes/routes')
const serverUse = require('./server.use');

const server = restify.createServer({
  handleUncaughtExceptions: true
});

serverUse.set(server, restify);
routes.applyRoutes(server);

server.pre((req, res, next) => {
  req.headers.accept = 'application/json';
  return next();
});

server.get('/api/status', (req, res) => {
  res.send('service is running');
});

server.listen(process.env.PORT, () => {
  db.connect();
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
