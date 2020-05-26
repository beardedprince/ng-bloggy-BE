const mongoose = require('mongoose')


require('dotenv').config()

const db = process.env.URL

// const altDb = ' mongodb://127.0.0.1:27017/ng-bloggy-1'

mongoose.connect( db , {useUnifiedTopology:true, useNewUrlParser: true}, err => {
    if(err) {
        console.log('error connecting to database')
    } else {
        console.log('database connected successfully')
    }

})