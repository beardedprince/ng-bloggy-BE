var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    avatar: String,
    description: String
});

module.exports = mongoose.model("user", UserSchema);