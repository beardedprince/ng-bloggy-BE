const mongoose = require('mongoose')

const db = 'mongodb+srv://ollie:olliedb@cluster0-2mplc.mongodb.net/ng-bloggy' 
// const altDb = ' mongodb://127.0.0.1:27017/ng-bloggy'

mongoose.connect( db, {useUnifiedTopology:true, useNewUrlParser: true}, err => {
    if(err) {
        console.log('error connecting to database')
    } else {
        console.log('database connected successfully')
    }

})