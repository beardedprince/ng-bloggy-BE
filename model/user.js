var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    avatar: String,
    description: String,
    // myPosts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'post'
    // }],
    postID: [{
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true,
    }],
    
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("user", UserSchema);