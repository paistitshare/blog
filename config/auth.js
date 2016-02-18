module.exports = {

    'facebookAuth' : {
        'clientID'        : '751378304999052',
        'clientSecret'    : '74ba94cbd8143712e45ee8a581a13cd8',
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileFields'   : ['id','emails','name']
    },

    'vkontakteAuth' : {
        'clientID'        : '5293657',
        'clientSecret'     : 'fqST64jAj8qwcMReMX15',
        'callbackURL'        : 'http://localhost:3000/auth/vkontakte/callback'
    },

    'twitterAuth' : {
        'consumerKey'         : 'RsUlDOf3Llghmd2c1hvhzdwzN',
        'consumerSecret'     : 'gfiihSGHgtHMA1NwYMYoFwOYZ5xvdGC7yVUJOpzTwZU1rYOqX7',
        'callbackURL'      : 'http://127.0.0.1:3000/auth/twitter/callback'
    }

};
