// app/model/models.js
var User = require('./user.js')
var Post = require('./post.js')
var Comment = require('./comment.js')
var Tag = require('./tag.js')
var sequelize = require('../config/connect.js')
var bCrypt = require('bcrypt-nodejs');

User.hasMany(Post, {foreignkey: 'post_pk'});
Post.belongsTo(User, {foreignKey: 'post_pk'});

User.hasMany(Comment, {foreignkey: 'comment_pk'});
Comment.belongsTo(User, {foreignKey: 'comment_pk'});

Post.hasMany(Comment, {foreignkey: 'post_comment_pk'});
Comment.belongsTo(Post, {foreignKey: 'post_comment_pk'});

Post.belongsToMany(Tag, {through: 'post_has_tags', foreignKey: 'post_tag_post_id'});
Tag.belongsToMany(Post, {through: 'post_has_tags', foreignKey: 'tags_identifier'});

sequelize.sync().then(function(){
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
	User.create({
   	username: 'admin',
   	password: createHash('admin')
  });
  console.log('Sequelize successfully synced');
})
.catch(function(err) {
	console.log(err);
});

module.exports.User = User
module.exports.Post = Post
module.exports.Comment = Comment
module.exports.Tag = Tag