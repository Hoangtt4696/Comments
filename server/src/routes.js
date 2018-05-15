const express = require('express');
const createError = require('http-errors');

const indexRoutes = require('./modules/home/routes/index.routes');
const commentApiRoutes = require('./modules/comments/routes/comment.api.routes');
const topicRoutes = require('./modules/topics/routes/topic.routes');
const topicApiRoutes = require('./modules/topics/routes/topic.api.routes');

const routers = express.Router();

routers.use('/', indexRoutes);
routers.use('/', topicRoutes);
routers.use('/api', commentApiRoutes);
routers.use('/api', topicApiRoutes);

// catch 404 and forward to error handler
routers.use(function(req, res, next) {
  next(createError(404));
});

// error handler
routers.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = routers;