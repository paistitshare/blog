var express = require('express');
var cloudinary = require('cloudinary');
var fs = require('fs');
var fileParser = require('connect-multiparty')();
var User = require('../models/user');
var Post = require('../models/post');
var Tag = require('../models/tag');
var Comment = require('../models/comment');
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

    router.get('/getTags', function(req, res){
        Tag.findAll().then(function(result) {
            var tags = result.map(function (tag) {
                return {text: tag.name, weight: Math.random() * (15 - 1) + 1};
            });
            res.send(JSON.stringify(tags));
        });
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    router.get('/edit-image-text', function(req, res){
       res.render('edit-image-text');
    });

    router.get('/profile', function(req, res){
        User.findOne({where: {username: req.params.username}}).then(function(usr) {
            if(req.isAuthenticated())
                res.render('profile', {user: req.user});
        }).catch(function (err) {
           if (err) res.render('error', {message: req.flash('message')});
        });
    });

    router.get('/profile/:username', function (req, res, next) {
        User.findOne({where: {username: req.params.username}}).then(function(usr) {
            //console.log("usr.username result is: " + usr.username);
            if (req.params.username===req.user.username&&req.isAuthenticated()) {
                Post.findAll({where: {UserId: req.user.id}}).then(function(posts){
                    res.send(posts);
                }).catch(function(err){
                    if (err) throw err;
                });
                res.render('profile', {user: req.user});
            }
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
        Tag.findAll().then(function(tags){
            if(req.isAuthenticated()) res.render('index', {user: req.user, tags: tags});
            res.render('index', {tags: tags});
        }).catch(function (err){
            if(err) throw err;
        });
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

    router.get('/create_image_text', isAuthenticated, function(req, res) {
        cloudinary.api.resources(function (items) {
            res.render('create_image_text', {username: req.user.username, cloudinary: cloudinary});
        });
    });

    router.post('/saveImageTextPost', function(req, res) {
        console.log(req.body.image);
        User.findOne({where: {username: req.body.username}}).then(function (user) {
            Post.create({
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,
                image: req.body.image,
                UserId: user.id
            }).then(function (post) {
                post.setUser([user]);
                var tagsBulk = req.body.tags.map(function (tag) {
                    return {PostId: post.id, name: tag.text};
                });
                Tag.bulkCreate(tagsBulk).then(function (tags) {
                    //tags.setPost(post);
                    res.send('success');
                });
            }).catch(function (err) {
                if (err) throw err;
            });
        });
    });

    router.get('/getPublications', function(req,res) {
        Post.findAll({where: {UserId: req.body.user_id}}).then(function(posts){
            res.send(posts);
        }).catch(function(err){
            if (err) throw err;
        });
    });

    router.get('/posts', function(req, res) {
        Post.findAll({where: {UserId: req.body.user_id}}).then(function(posts){
            res.send(posts);
        }).catch(function(err){
            if (err) throw err;
        });
        if(req.isAuthenticated()) res.render('posts', {user: req.user});
        else res.render('posts');
    });

    router.get('/post/:id', function(req, res) {
        Post.findOne({where: {id: req.params.id}}).then(function(post){
            //var posts = result.map(function (post) {
            //    return {id: post.id, title: post.title, description: post.description ,updatedAt: post.updatedAt, content: post.content, UserId: post.UserId};
            //});
            if(req.isAuthenticated()) res.render('post',{post: post, user: req.user});
            else res.render('post',{post: post});
        }).catch(function(err){
            if (err) throw err;
        });
    });

    router.get('/getPosts', function (req, res){
        Post.findAll().then(function(result){
            var posts = result.map(function (post) {
                return {id: post.id, title: post.title, description: post.description ,updatedAt: post.updatedAt, content: post.content, UserId: post.UserId};
            });
            console.log(posts);
            for(post in posts) {
                console.log('post.id: ' + post.id + ' post.title: ' + post.title);
            }
            res.send(JSON.stringify(posts));
        }).catch(function(err){
            if (err) throw err;
        });
    });

    router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true

    }));

    router.get('/auth/twitter', passport.authenticate('twitter'));

    router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/home',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

    router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
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
