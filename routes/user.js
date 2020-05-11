const express = require('express')
// const jwt = require('jsonwebtoken');


const userRoute = express.Router()

const Users = require('../model/user')

const Posts = require('../model/post')



userRoute.post('/users', (req, res) => {
    const userBody = req.body
    userBody.postID = req.params.id
    const user = new Users(userBody)
    user.save( (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'error occured'
            })
            console.log(err)
        } else {
            // let payload = {subject: user._id}
            // let token = jwt.sign(payload, 'secretKey')
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
    }).populate('postID')
})


userRoute.get('/users/:id', async (req, res) => {
    await Users.findById({postID: req.params.id}, (err, data) => {
        if(err) {
            res.status(404).json({
                message: 'error occured while getting users post'
            })
        } else {
            res.status(200).json({message: data})
            console.log(data)
        }
    }).populate('post')
    
})


// userRoute.delete('/users/:id', async (req, res) => {
    
//     await Users.findByIdAndDelete( req.params.id, (err, result) => {
//         if(err) {
//             console.log('err')
//         } else {
//             res.status(200).json({
//                 message: 'deleted'
//             })
//         }
//     }).populate('myPosts')
//     Users.save()
// })





module.exports = userRoute