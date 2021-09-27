var express = require('express');
var path = require('path');
var logger = require('morgan');
require('./config/database');
const cors = require('cors');

var usersRouter = require('./app/routes/users');
var notesRouter = require('./app/routes/notes');

var corsOptions = {
  origin: 'https://mynotes-front.netlify.app',
  optionSuccessStatus: 200,
  methods: 'GET, PUT, DELETE, POST'
}

var app = express();
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;
