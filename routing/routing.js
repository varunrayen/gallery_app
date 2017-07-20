
const router = require('express').Router();
const mongoose = require("mongoose");
const fs = require("fs");
const User = require('../models/User.js');
const Image = require('../models/Image.js');
const session = require('express-session');
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const cookieParser = require('cookie-parser');
const path = require('path');
const url = require('url');
const imageDir = './uploads';

router.use(session({secret: "sdfga465regse", resave: false, saveUninitialized: true}));
router.use(cookieParser());

router.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('Gallery API works');

});

router.get('/dashboard', (req, res) => {
  if(!req.session.username){
    return res.status(401).send();
  }




  return res.status(200).send();
});


router.get('/images', (req, res) => {


  // if(!req.session.username){
  //   return res.status(401).send();
  // }
  // else{
       
    var fileType = '.jpg',
        files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                files.push(list[i]); //store the file name into the array files
                console.log(list[i]);
            }
        }
        console.log(err);
    });
  

  // }
 
});


router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(404).send();
    }
    //req.session.username = username;
    res.cookie('username', username);
    console.log(req.cookies);
    return res.json({success: true, username: username});
  })
});

router.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let newuser = new User();
  newuser.username = username;
  newuser.password = password;

  newuser.save(function(err, savedUser) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();  p
  })

});

router.get('/users', (req, res) => {
  console.log(req);
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  });
});



router.post('/gallery', (req, res) => {
  mongoose.model('images').find({username: req.body.username}, function(err, images) {
    res.send(images);
  });
});


// let Grid = require("gridfs-stream");
// let conn = mongoose.connection;
// Grid.mongo = mongoose.mongo;
// let gfs;

// conn.once("open", () => {
//     gfs = Grid(conn.db);
//     router.get('/', (req, res) => {
//       res.send('Hello Gallery User !');
//     });
//     router.get('/img/:imgname', (req, res) => {
//         gfs.files.find({
//             filename: req.params.imgname
//         }).toArray((err, files) => {

//             if (files.length === 0) {
//                 return res.status(400).send({
//                     message: 'File not found'
//                 });
//             }
//             let data = [];
//             let readstream = gfs.createReadStream({
//                 filename: files[0].filename
//             });

//             readstream.on('data', (chunk) => {
//                 data.push(chunk);
//             });

//             readstream.on('end', () => {
//                 data = Buffer.concat(data);
//                 let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
//                 res.end(img);
//             });

//             readstream.on('error', (err) => {
//                 console.log('An error occurred!', err);
//                 throw err;
//             });
//         });
//     });
//     router.post('/img', (req, res) => {
//         let part = req.files.file;
//         let writeStream = gfs.createWriteStream({
//             filename: 'img_' + part.name,
//             mode: 'w',
//             content_type: part.mimetype
//         });

//         writeStream.on('close', (file) => {
//             return res.status(200).send({
//                 message: 'Success',
//                 file: file
//             });
//         });

//         writeStream.write(part.data);

//         writeStream.end();
//     });
// })


module.exports = router;