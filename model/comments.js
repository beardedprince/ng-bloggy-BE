const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = Schema({
    name: String,
    comment: String,
    email: String,
    date: {type: Date, default: Date.now},
    postID: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true,
    }
    
})

module.exports = mongoose.model('comment', CommentSchema)