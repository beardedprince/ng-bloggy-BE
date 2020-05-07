const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const multer = require('multer')
// const path = require('path')
// var cloudinary = require('cloudinary');
// const cloudinaryStorage  = require('multer-storage-cloudinary')




const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/api')
const userRoute = require('./routes/user')
const config = require('./config/db')


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


// app.use('/public', express.static('public'));


app.get('/', (req, res) => {
    res.send(` <div style = "display: grid; place-items: center; justify-items: center"> 
                <h1> ng-bloggy backend currently brewing 🔥🔥✌ </h1> 
                </div>`)
})

// app.post('/upload', parser.single('avatar'), (req, res, next,  err) => {
//     if (err) {
//         res.json({message: 'err'})
//         console.log(err.message)
//     } else {
//          console.log(req.file) // to see what is returned to you
//     }
   
// //     const image = {};
// //   image.url = req.file.url;
// //   image.id = req.file.public_id;
// //   Image.create(image) // save image information in database
// //     .then(newImage => res.json(newImage))
// //     .catch(err => console.log(err));
// })




app.listen(port, function() {
    console.log( `app listening on port ${port}`)
})