const express = require('express');
const bodyParser= require('body-parser');
const logger           = require('morgan');
//const busboyBodyParser = require('busboy-body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const session = require('express-session');
const multer = require('multer');
const cookieParser = require('cookie-parser');
var port = 3000;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: "sdfga465regse", resave: false, saveUninitialized: false, cookie: { secure: false }}));

//app.use(busboyBodyParser({ limit: '5mb'} ));
app.use(logger('dev'));
app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, Name');
        res.header('Access-Control-Allow-Credentials', true);        
        next();
});




app.get('/', function(req, res){
    req.session.user = "testiser";
     res.send('Hello Express');
});

let main = require('./routing/routing.js');
app.options('/api');
app.use('/api', main);

let dbURI = 'mongodb://127.0.0.1/gallery-app';
    
    mongoose.connect(dbURI);

    // CONNECTION EVENTS
    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to ' + dbURI);
    });
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose disconnected');
    });

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, 'Image' + '-' + req.headers.name + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        console.log(req.headers);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});


app.listen(port, function(){
	console.log('Gallery API');
})

