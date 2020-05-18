const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema

const PostSchema = Schema({
    title: String,
    postbody: String,
    date: {type: Date, default: Date.now},
    tags: [{
        type: String
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // where comment
})

PostSchema.plugin(timestamps)

module.exports = mongoose.model('post', PostSchema)