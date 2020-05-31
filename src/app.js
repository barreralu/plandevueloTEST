const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const exphbs = require('express-handlebars');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const logger = require('morgan');
const methodOverride = require('method-override');
const parseError = require('parse-error');
const path = require('path');

const CORS = require('./configs/cors');

const db = require('./models');
const router = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({
  defaultLayout: 'layout',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors(CORS));
app.use(
  expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database.');
  })
  .then(() => {
    db.sequelize
      .sync()
      // .sync({ force: true })
      .then(() => console.log('Sync completo.'))
      .catch((err) => {
        console.error('Error al realizar el Sync.');
        console.error(parseError(err));
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database.');
    console.error(parseError(err));
  });

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', (error) => {
  console.error('Uncaught Error', parseError(error));
});

module.exports = app;
