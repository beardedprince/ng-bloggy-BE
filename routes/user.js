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
    }).populate('post')
})


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


userRoute.delete('/users/:id', async (req, res) => {
    
    await Users.findByIdAndDelete( req.params.id, (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).json({
                message: 'deleted'
            })
        }
    }).populate('myPosts')
    
})


// Users.findById(req.params.id, (req, res) => {
//     if(err) {
//         res.status(400).send('error')
//     }
//     const newPost = {
//         title: req.body.title,
//         postbody: req.body.postbody
//     }
//     Posts.create(newPost, (err, result) => {
//         if(err) {
//             res.status(400).send('not posted')
//         }
//         Users.postedBy.push(newPost)
//         Users.save((err, saved) => {
//             if(err) {
//                 res.status(400).send('error')
//             } else {
//                 res.status(200).json({
//                     message: "successful",
//                     data: saved
//                 })
//             }
//         })
//     })
// })


module.exports = userRoute