var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {

            findOrCreateUser = function () {

                User.find({where: {username: username}}).then(function (user) {
                    if (user) {
                        console.log('User already exists with username: ' + username);
                        return done(null, false, req.flash('message', 'User Already Exists'));
                    } else {
                        console.log(password);
                        var newUser = {
                            username: username,
                            password: createHash(password),
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        };
                        console.log(JSON.stringify(newUser));
                        User.build(newUser).save().then(function (result) {
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        }).catch(function (err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                        });
                    }
                }).catch(function (err) {
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );

    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}