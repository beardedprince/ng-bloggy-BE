var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    avatar: String,
    description: String,
    myPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
});

module.exports = mongoose.model("user", UserSchema);