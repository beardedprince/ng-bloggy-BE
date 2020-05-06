const express = require('express')
const multer = require('multer')
const path = require('path')


const userRoute = express.Router()

const Users = require('../model/user')

const Posts = require('../model/post')




// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename : function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// initialize uplaod variable 
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024
    },
    fileFilter: function(req, res, cb) {

    }
})


userRoute.post('/api/upload', upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});


userRoute.post('/users', (req, res) => {
    const userBody = req.body
    const user = new Users(userBody)
    user.save( (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
            console.log(result)
        }
    })
})


userRoute.get('/users', async (req, res) => {
    
    await Users.find( {}, (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
        }
    }).populate('myPosts')
})


userRoute.get('/users/:id', async (req, res) => {
    await Users.findById({user: req.user.id}, (err, data) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).json({message: data})
            console.log(data)
        }
    }).populate('myPosts')
    
})


userRoute.delete('/users/:id', async (req, res) => {
    
    await Users.findByIdAndDelete( req.params.id, (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
        }
    }).populate('myPosts')
    Users.save()
})



module.exports = userRoute