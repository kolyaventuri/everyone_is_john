import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import express from 'express';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
// Favicon: import favicon from 'serve-favicon';

import index from './routes';

const app = express();
const debugLogger = debug('everyone-is-john:app');
app.set('views', path.join(__dirname, 'views'));
// View engine setup
app.set('view engine', 'pug');
// Uncomment after placing your favicon in /public
// Faivcon: app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, _) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', err => {
  debugLogger('Caught exception: %j', err);
  process.exit(1);
});

export default app;
