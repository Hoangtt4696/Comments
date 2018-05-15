const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const oidc  = require('./utils/oidc.util');

const routes = require('./routes');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  name: 'haravan_oss_comment',
  secret: 'b2383c75e06a89366869f2e05e1c8db2bbb66def',
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(routes);

module.exports = app;
