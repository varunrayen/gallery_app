const router = require('express').Router();
const mongoose = require("mongoose");
const session = require('express-session');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');
const Image = require('../models/Image.js');


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
    var token = jwt.sign(user, 'creabird', {
          expiresIn: 3600 // expires in 24 hours
    });
    return res.json({success: true, username: username, token: token});
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


module.exports = router;