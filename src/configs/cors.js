const CORS = {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-API-KEY',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Acces-Control-Allow-Request-Method',
  ],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  preflightContinue: false,
};

module.exports = CORS;
