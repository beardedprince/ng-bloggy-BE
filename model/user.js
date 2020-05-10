var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    avatar: String,
    description: String,
    // social: [{
    //     twitter: String,
    //     github: String,

    // }],
    myPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("user", UserSchema);