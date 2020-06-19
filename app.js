// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/product'); // Imports routes for the products
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

var app = express();
// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/test';
//var mongoDB = 'mongodb://test:test@cluster0-shard-00-00-pl5om.mongodb.net:27017,cluster0-shard-00-01-pl5om.mongodb.net:27017,cluster0-shard-00-02-pl5om.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(process.env.MONGO_URI || mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

var port = process.env.PORT || 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
