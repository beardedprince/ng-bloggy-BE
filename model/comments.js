const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = Schema({
    name: String,
    comment: String,
    email: String,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('comment', CommentSchema)