const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = Schema({
    imageUrl : String
})

module.exports = mongoose.model('image', ImageSchema);