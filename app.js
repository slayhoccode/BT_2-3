var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var connectDB = require('./config/db');
connectDB();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/roles', require('./routes/roles'));

// 404
app.use(function (req, res, next) {
    next(createError(404, 'API not found'));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message
    });
});

module.exports = app;