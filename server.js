const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary').v2




const app = express()
const port = process.env.PORT || 3000


const route = require('./routes/api')
const userRoute = require('./routes/user')
const commentRoute = require('./routes/comment.route')
const config = require('./config/db')










const upload = require('./multer')
// const cloudConfig = require('./config/cloudinaryConfig')
const Image = require('./model/image')

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


app.post('/users', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('error', err)
        } else {
            console.log(req.file);
            res.send('file uploaded successfully')
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret
            })

            cloudinary.uploader.upload(req.file.path, function(result) { 
                
                console.log('the result', result.secure_url)
                // const image = new Image()
                // req.body.userimage = result.secure_url;
                // image.save((err, data) => {
                //     if (err) {
                //         console.log(err)
                //         res.status(401).send('wrong resource')
                //     } else {
                //         res.status(200).send('image added')
                //     }
                // })
            })
        }
    })
})


app.listen(port, function() {
    console.log( `app listening on port ${port}`)
})