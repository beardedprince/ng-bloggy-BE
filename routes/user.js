const express = require('express')
// const jwt = require('jsonwebtoken');


const userRoute = express.Router()

const Users = require('../model/user')

const Posts = require('../model/post')






userRoute.post('/users', (req, res) => {
    const userBody = req.body
    userBody.postedBy = req.params.id
    console.log(userBody.postedBy)
    const user = new Users(userBody)
    user.save( (err, result) => {
        if(err) {
            console.log('err')
        } else {
            // let payload = {subject: user._id}
            // let token = jwt.sign(payload, 'secretKey')
            res.status(200).send(result)
            console.log(result)
        }
    })
})

// GET all users
userRoute.get('/users', async (req, res) => {
    
    await Users.find( {}, (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
        }
    }).populate('post')
})

// GET users details by its ID
userRoute.get('/users/:id', async (req, res) => {
    
    await Users.findById( req.params.id, (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
        }
    }).populate('post')
})


// UPDATE user details by ID
userRoute.put('/users/:id', async (req, res) => {
    
    await Users.findById( req.params.id, (err, result) => {
        if(err) {
            res.status(200).json({'message': err})
            console.log('err')
        } else {
            result.name = req.body.name
            result.username = req.body.username
            result.description = req.body.description
            result.socials = req.body.socials

            result.save()
            res.status(200).json({'success': result})
            console.log(result)
        }
    }).populate('post')
})

// GET
userRoute.get('/users/:id', async (req, res) => {
    await Users.findById({postID: req.params.id}, (err, data) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).json({message: data})
            console.log(data)
        }
    }).populate('post')
    
})

//  DELETE a user with its ID
userRoute.delete('/users/:id', async (req, res) => {
    
    await Users.findByIdAndDelete( req.params.id, (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).json({
                message:  `user ${result._id} deleted`
            })
        }
    }).populate('myPosts')
    
})




module.exports = userRoute