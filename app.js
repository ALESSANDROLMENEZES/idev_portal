const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const challengesRouter = require('./routes/challenges');
const classesRouter = require('./routes/classes');
const feedbacksRouter = require('./routes/feedbacks');
const modulesRouter = require('./routes/modules');
const questionnairesRouter = require('./routes/questionnaires');
const teamsRouter = require('./routes/teams');
const timelineRouter = require('./routes/timeline');
const { validate } = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use(validate);
app.use('/api/users', usersRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/classes', classesRouter);
app.use('/api/feedbacks', feedbacksRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/questionnaires', questionnairesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/timeline', timelineRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json('error');
});

module.exports = app;
