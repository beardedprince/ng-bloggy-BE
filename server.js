const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')




const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/api')
const userRoute = require('./routes/user')
const commentRoute = require('./routes/comment.route')
const config = require('./config/db')


const upload = require('./multer')
const cloudinary = require('./config/cloudinaryConfig')

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
//     });

//     const storage = cloudinaryStorage({
//         cloudinary: cloudinary,
//         folder: "ng-bloggy",
//         allowedFormats: ["jpg", "png"],
//         transformation: [{ width: 500, height: 500, crop: "limit" }]
//         });
//         const parser = multer({ storage: storage });

// set storage engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// })
   
// const upload = multer({ storage: storage })

app.use(bodyParser.json())
app.use(cors())


app.use('/api', route)
app.use('/api', userRoute)
app.use('/api', commentRoute)


// app.use('/public', express.static('public'));


app.get('/', (req, res) => {
    res.send(` <div style = "display: grid; place-items: center; justify-items: center"> 
                <h1> ng-bloggy backend currently brewing 🔥🔥✌ </h1> 
                </div>`)
})


app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('error', err)
        } else {
            console.log(req.file);
            res.send('works')
        }
    })
})


app.listen(port, function() {
    console.log( `app listening on port ${port}`)
})