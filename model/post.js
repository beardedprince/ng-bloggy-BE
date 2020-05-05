const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema

const PostSchema = Schema({
    title: String,
    postbody: String,
    date: {type: Date, default: Date.now},
    postedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    
})

PostSchema.plugin(timestamps)

module.exports = mongoose.model('post', PostSchema)