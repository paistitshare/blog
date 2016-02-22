var User = require('./user.js');
var Post = require('./post.js');
var Comment = require('./comment.js');
var Tag = require('./tag.js');
var Rate = require('./rate.js');
var Like = require('./like.js')
var sequelize = require('../config/connect.js');
var bCrypt = require('bcrypt-nodejs');

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasOne(Rate);
Rate.belongsTo(Post);

Comment.hasMany(Like);
Like.belongsTo(Comment);

Post.hasMany(Tag);
Tag.belongsTo(Post);

sequelize.sync().then(function(){
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
	User.create({
   	username: 'admin',
   	password: createHash('admin'),
	firstName: 'Ivan',
	lastName: 'Ivanov',
	shortly: 'Simple Man',
	interests: 'Programming',
	email: 'admin@itblog.com'
  }).then(function(result){}).catch(function(err){});
  	console.log('Sequelize successfully synced');
})
.catch(function(err) {
	console.log(err);
});

module.exports.User = User;
module.exports.Post = Post;
module.exports.Comment = Comment;
module.exports.Tag = Tag;