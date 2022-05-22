// import User model 
const User = require('./User');
//import post model
const Post = require('./Post');

// create association
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// export an object with User model as property
module.exports = { User, Post };