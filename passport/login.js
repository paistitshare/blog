var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var VkontakteStrategy = require('passport-vkontakte').Strategy;
var User = require('../models/user');
var configAuth = require('../config/auth');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            User.find({where: {username :  username }}).then(function(user) {
                    if (!user){
                        console.log('User Not Found with username '+ username);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password'));
                    }
                console.log('User Found: ' + user);
                return done(null, user);
            }).catch(function(err){
                return done(err);
            });
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };

     passport.use(new FacebookStrategy({
         clientID        : configAuth.facebookAuth.clientID,
         clientSecret    : configAuth.facebookAuth.clientSecret,
         callbackURL     : configAuth.facebookAuth.callbackURL,
         profileFields   : ['id','emails','name'],
         enableProof: true,
         passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
     },
     function(req, token, refreshToken, profile, done) {
             // check if the user is already logged in
             if (!req.user) {
                 User.findOne({ where :{ 'facebookid' : profile.id }})
                     .then (function (user) {
                         if (user) {

                             // if there is a user id already but no token (user was linked at one point and then removed)
                             if (!user.facebooktoken) {
                                 user.facebooktoken = token;
                                 user.facebookname  = profile.name.givenName + ' ' + profile.name.familyName;
                                 user.facebookemail = profile.emails[0].value;

                                 user.save()
                                     .then( function() {done(null, user);})
                                     .catch (function(e) {});
                             } else {
                                 done(null, user);
                             }
                         } else {
                             // if there is no user, create them
                             var newUser = User.build ({
                                 facebookid: profile.id,
                                 facebooktoken: token,
                                 facebookname: profile.name.givenName + ' ' + profile.name.familyName,
                                 facebookemail: profile.emails[0].value
                             });
                             newUser.save()
                                         .then( function(user) {done(null, user);})
                                         .catch (function(err) {if (err) throw err;});
                         }
                     });
             } else {
                 // user already exists and is logged in, we have to link accounts
                 var user            = req.user; // pull the user out of the session

                 user.facebookid    = profile.id;
                 user.facebooktoken = token;
                 user.facebookname  = profile.name.givenName + ' ' + profile.name.familyName;
                 user.facebookemail = profile.emails[0].value;

                 user.save()
                     .then( function(user) {done(null, user);})
                     .catch (function(err) {if (err) throw err; });
             }
         }));

    passport.use(new TwitterStrategy({
            consumerKey     : configAuth.twitterAuth.consumerKey,
            consumerSecret  : configAuth.twitterAuth.consumerSecret,
            callbackURL     : configAuth.twitterAuth.callbackURL,
            passReqToCallback : true
        },
        function(req, token, refreshToken, profile, done) {
            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ where :{ 'twitterid' : profile.id }})
                    .then (function (user) {
                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.twittertoken) {
                                user.twittertoken = token;
                                user.twittername  = profile.username;
                                user.save()
                                    .then( function() {done(null, user);})
                                    .catch (function(err) {if (err) throw err;});
                            } else {
                                done(null, user);
                            }
                        } else {
                            // if there is no user, create them
                            var newUser = User.build ({
                                twitterid: profile.id,
                                twittertoken: token,
                                twittername: profile.username
                            });
                            newUser.save()
                                .then( function(user) {done(null, user);})
                                .catch (function(err) {if (err) throw err;});
                        }
                    });
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
                user.twitterid    = profile.id;
                user.twittertoken = token;
                user.twittername  = profile.username;

                user.save()
                    .then( function(user) {done(null, user);})
                    .catch (function(err) {if (err) throw err; });
            }
        }));

    passport.use(new VkontakteStrategy({
            clientID        : configAuth.vkontakteAuth.clientID,
            clientSecret    : configAuth.vkontakteAuth.clientSecret,
            callbackURL     : configAuth.vkontakteAuth.callbackURL,
            profileFields   : ['id','emails','name'],
            enableProof: true,
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, token, refreshToken, profile, done) {
            // check if the user is already logged in
            if (!req.user) {
                User.findOne({ where :{ 'vkontakteid' : profile.id }})
                    .then (function (user) {
                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.vkontaktetoken) {
                                user.vkontaktetoken = token;
                                user.vkontaktename  = profile.name.givenName + ' ' + profile.name.familyNamex;
                                user.vkontakteemail = profile.email;

                                user.save()
                                    .then( function() {done(null, user);})
                                    .catch (function(e) {});
                            } else {
                                done(null, user);
                            }
                        } else {
                            // if there is no user, create them
                            var newUser = User.build ({
                                vkontakteid: profile.id,
                                vkontaktetoken: token,
                                vkontaktename: profile.name.givenName + ' ' + profile.name.familyName,
                                vkontakteemail: profile.email
                            });
                            newUser.save()
                                .then( function(user) {done(null, user);})
                                .catch (function(err) {if (err) throw err;});
                        }
                    });
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
                user.vkontakteid    = profile.id;
                user.vkontaktetoken = token;
                user.vkontaktename  = profile.name.givenName + ' ' + profile.name.familyName;
                user.vkontakteemail = profile.email;

                user.save()
                    .then( function(user) {done(null, user);})
                    .catch (function(err) {if (err) throw err; });
            }
        }));

};
