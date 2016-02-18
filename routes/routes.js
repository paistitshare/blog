var express = require('express');
var cloudinary = require('cloudinary');
var fs = require('fs');
var fileParser = require('connect-multiparty')();
var User = require('../models/user');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/signin');
};

module.exports = function(passport){
  cloudinary.config({
    cloud_name: 'paistitshare',
    api_key: '233287316764462',
    api_secret: 'yHSUvmziYP-TPn86LjHr86hAQ3I'
  });

  router.get('/', function(req, res) {
    res.render('index');
    if(isAuthenticated) res.redirect('/profile');
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash : true
  }));

  router.get('/profile', isAuthenticated, function(req, res, next) {
    console.log('\n\nreq.user: '+ req.user+ '\n\n');
    res.render('profile', {user: req.user});
  });

  router.get('/signin', function(req, res){
    res.render('signin', { message: req.flash('message')});
  });

  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });


  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  router.get('/findone', function(req, res){
    console.log('res sendeed: ' + req.query.id);
    User.findOne({where: {id: req.query.id}}).then(function(user){
      console.log('going query');
      res.send(user);
    });
  });

  router.get('/home', isAuthenticated, function(req, res){
    console.log('req.user: ' + req.user);
    res.render('/index', {user: req.user});
  });

  router.post('/upload', fileParser, function(req, res){
      var imageFile = req.files.image;
    cloudinary.uploader.upload(imageFile.path, function(result){
      if (result.url) {
          User.findOneAndUpdate({
        username: req.user.username
      }, {
      $push: {
        images: result.url
      }
      }, function(err, rslt) {
      if (err) throw err;
        cloudinary.api.resources(function(items){
          res.render('draw', { user: req.user, images: items.resources, cloudinary: cloudinary });
        });
      });
      } else {
        console.log('Error uploading to cloudinary: ',result);
        res.send('did not get url');
      }
      });
  });

  router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/signin'
  }));

  router.get('/auth/twitter', passport.authenticate('twitter'));

  router.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/signin'
  }));

  router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

  router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
        successRedirect: '/profile',
        failureRedirect: '/signin' }));

  router.post('/save', isAuthenticated, function(req, res){
    User.findOneAndUpdate({
      username: req.user.username
    }, {
    $set: {
      workflow: req.body.workflow
    }
    }, function(err, result) {
    if (err) throw err;
      res.send(result);
    });
  });

  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}
