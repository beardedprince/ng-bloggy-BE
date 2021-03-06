const express = require('express')
const mongoose = require('mongoose')

const Posts = require('../model/post')
const Users = require('../model/user')
const Comments = require('../model/comments')



const commentRoute = express.Router()




// allow user create comment on a partucular post by the post ID
commentRoute.post('/comment/:id', (req, res) => {
   
    const postbody = req.body 
    postbody.postID = req.params.id
    const comment = new Comments(postbody)
    comment.save((err, result)=> {
        if(err) {
            res.status(404).json({
                message: 'error occured'
            })
            console.log(err)
        } else {
            res.status(200).json({
                message: 'comment successful',
                data: result
            })
        }
    })
})

// get all comment 
commentRoute.get('/comments', async (req, res) => {
    await Comments.find({}, (err, result)=> {
        if(err) {
            res.status(404).json({
                message: 'error occured while getting comment'
            })
            console.log(err)
        } else {
            res.status(200).json({
                message: 'All comments successful gotten',
                data: result
            })
        }
    }).sort({ date: -1}).populate('post')
    
})

// get user comment by id
commentRoute.get('/comments/:id', async (req, res) => {
    await Comments.find({postID: req.params.id}, (err, result)=> {
        if(err) {
            res.status(404).json({
                message: 'error occured while getting comment'
            })
            console.log(err)
        } else {
            res.status(200).send({
                message: result,
            })
        }
    }).sort({ date: -1}).populate('post')
    
})

// get comment cound of a particular post by its ID
commentRoute.get('/comments/count/:id', async (req, res) => {
    await Comments.count({postID: req.params.id}, (err, result)=> {
        if(err) {
            res.status(404).json({
                message: 'error occured while getting comment'
            })
            console.log(err)
        } else {
            res.status(200).send({
                message: result,
            })
        }
    }).sort({ date: -1}).populate('post')
    
})


// get user comment by id
commentRoute.get('/comment:id', async (req, res) => {
    await Comments.findById({}, (err, result)=> {
        if(err) {
            res.status(404).json({
                message: 'error occured while getting comment'
            })
            console.log(err)
        } else {
            res.status(200).json({
                message: 'comments successful gotten',
                data: result
            })
        }
    }).sort( { name: 1 } ).populate('post')
})


// delete all comments
commentRoute.delete('/comments', async (req, res) => {
    await Comments.deleteMany({}, (err, result)=> {
        if(err) {
            res.status(404).json({
                message: 'error occured while getting comment'
            })
            console.log(err)
        } else {
            res.status(200).json({
                message: 'All comments successful gotten',
                data: result
            })
        }
    }).sort({ updatedAt: -1}).populate('post')
})


module.exports = commentRoute