const express = require('express')

const userRoute = express.Router()

const Users = require('../model/user')

const Posts = require('../model/post')



userRoute.post('/users', (req, res) => {
    const userBody = req.body
    const user = new Users(userBody)
    user.save( (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
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