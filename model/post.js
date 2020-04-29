const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema

const PostSchema = Schema({
    title: String,
    postbody: String,
    date: {type: String, default: Date.now}
})

PostSchema.plugin(timestamps)

module.exports = mongoose.model('post', PostSchema)