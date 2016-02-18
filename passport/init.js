var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user');
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log('deserializing user');
        //User.find({where: {id: user.id}}).then(function(user){
        //    done(null, user);
        //}).catch(function(err){
        //    done(err, null)
        //});
        User.findOne({where: {id: user.id}}).then(function(user){
            console.log('done(null, user);');
            done(null, user);
        }).catch(function(err) {
            console.log('done(err, null);');
            done(err, null);
        });
        //console.log('Deserialize user called.');
        //return done(null, {username: 'abc', firstName: 'Foo', lastName: 'Bar' });
    });

    login(passport);
    signup(passport);

};