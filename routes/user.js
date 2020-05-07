const express = require('express')
const jwt = require('jsonwebtoken');


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
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
            console.log(token)
            console.log(result._id)
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
    await Users.findById(req.params.id, (err, data) => {
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