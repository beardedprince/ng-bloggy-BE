var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    description: String
});

module.exports = mongoose.model("User", UserSchema);