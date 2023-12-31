var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var apiRouter = require('./routes/index')
var cors = require('cors')
const multer = require('multer');
const bodyParser = require('body-parser');
const upload = require('./multerConfig')
const fs = require('fs');
require('dotenv').config();



var app = express();

const allowedOrigins = ['http://localhost:3001'];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
  origin: function (origin, callback) {
    // Sprawdzenie, czy pochodzenie (origin) jest na liście dozwolonych domen
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Umożliwienie przesyłania danych uwierzytelniania (credentials)
}));

app.use('/book', express.static('uploads'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiRouter);
// app.use('/uploads', express.static('uploads'));

// // Ustawienie ścieżki do folderu, w którym znajdują się obrazy
// const imgFolder = path.join(__dirname, 'images');

// // Definicja ścieżki, na której można odczytać obrazy
// app.get('/images/:imageName', (req, res) => {
//   const imageName = req.params.imageName;
//   const imagePath = path.join(imgFolder, imageName);
  
//   // Sprawdzenie, czy plik istnieje
//   fs.access(imagePath, fs.constants.R_OK, (err) => {
//     if (err) {
//       // Plik nie istnieje lub jest nieodczytalny
//       res.status(404).send('Obrazek nie został znaleziony');
//     } else {
//       // Plik istnieje - wysyłanie odpowiedzi z obrazkiem
//       res.sendFile(imagePath);
//     }
//   });
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send('Internal Server Error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



var mongoDB = "mongodb://127.0.0.1/quantoo";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("connect", console.info.bind(console, "MongoDB connection ready:"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use('/uploads', express.static('uploads'));


module.exports = app;