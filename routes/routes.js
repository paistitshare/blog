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

module.exports = function (passport) {
    cloudinary.config({
        cloud_name: 'paistitshare',
        api_key: '233287316764462',
        api_secret: 'yHSUvmziYP-TPn86LjHr86hAQ3I'
    });

    router.get('/', function (req, res) {
        if(req.isAuthenticated()) res.render('index', {user: req.user});
        res.render('index');
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    router.get('/profile/:username', function (req, res, next) {
        //console.log('req.params.username: ' + req.params.username + 'req.user.username' + req.user.username);
        User.findOne({where: {username: req.params.username}}).then(function(usr) {
            console.log("usr.username result is: " + usr.username);
            if (req.params.username===req.user.username&&req.isAuthenticated()) res.render('profile', {user: req.user});
            else res.render('view-profile', {info: usr});
        }).catch(function(error) {
            if(req.isAuthenticated()) res.render('404', {user: req.user});
            else res.render('404');
        });
        //console.log('\n\nreq.user: ' + req.user + '\n\n');
        //res.render('profile');
        //res.render('profile', {user: req.user});
    });

    //router.get('/profile/:username', function (req, res, next) {
    //    User.findOne({where: req.params.username}).then(function(usr) {
    //        res.render('view-profile', {info: usr});
    //    }).catch(function(error) {
    //        res.render('404');
    //    });
    //});

    router.get('/signin', function (req, res) {
        res.render('signin', {message: req.flash('message')});
    });

    router.get('/signup', function (req, res) {
        res.render('register', {message: req.flash('message')});
    });


    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/findone', function (req, res) {
        console.log('res sendeed: ' + req.query.id);
        User.findOne({where: {id: req.query.id}}).then(function (user) {
            res.send(user);
        });
    });

    router.get('/home', isAuthenticated, function (req, res) {
        console.log('req.user: ' + req.user);
        res.render('index', {user: req.user});
    });

    router.get('/edit-settings', isAuthenticated, function (req, res) {
        cloudinary.api.resources(function (items) {
            res.render('edit-settings', {user: req.user, images: items.resources, cloudinary: cloudinary});
        });
    });

    router.get('/getSettings', function (req, res) {
        res.send({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            shortly: req.user.shortly,
            interests: req.user.interests,
            email: req.user.email,
            language: req.user.language,
            theme: req.user.theme,
            avatar: req.user.avatar
        });
    });

    router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    }));

    router.get('/auth/twitter', passport.authenticate('twitter'));

    router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/signin'
        }));

    router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

    router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    }));

    router.get('/', isAuthenticated, function (req, res) {
        res.redirect('/home');
    });

    router.post('/saveSettings', isAuthenticated, function (req, res) {
        User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            language: req.body.language,
            shortly: req.body.shortly,
            interests: req.body.interests,
            theme: req.body.theme,
            avatar: req.body.avatar
        }, {where: {id: req.user.id}});
        res.send('success');
    });

    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};
