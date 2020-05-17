// app.js

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var product = require('./routes/product'); // Imports routes for the products
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://127.0.0.1:27017/test';
var mongoDB = 'mongodb://test:test@cluster0-shard-00-00-pl5om.mongodb.net:27017,cluster0-shard-00-01-pl5om.mongodb.net:27017,cluster0-shard-00-02-pl5om.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/products', product);

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
