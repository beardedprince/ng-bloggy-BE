const express = require('express')
const mongoose = require('mongoose')

const Posts = require('../model/post')
const Users = require('../model/user')
const Comments = require('../model/comments')



const route = express.Router()


// create a new post by user id
route.post('/post/:id', (req, res) => {
    const postBody = req.body
    postBody.postedBy = req.params.id
    const post = new Posts(postBody)
    console.log(post)
    post.save( (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'wrong resource'
            })
            console.log('err')

        } else {
            res.status(200).json({
                message: 'success'
            })
           
        }
    })
})

// get all posts
route.get('/post', async (req, res) => {
    await Posts.find({ }, (err, result ) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result)
        }
    }).sort( { updatedAt: -1 } )
    .populate( 'postedBy')
   
})

// get post details by its ID
route.get('/post/:id', async (req, res) => {
    Posts.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('data ', data)
            res.status(200).send(data)
        }
    }).populate('postedBy')
   
    
})


// get postby its specific user ID
route.get('/post/user/:id', async (req, res) => {
   
    await Posts.find({postedBy: req.params.id},  (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('data ', data.postedBy)
            res.status(200).json({data: data })
        }
    }).sort( { updatedAt: -1 } ).populate('postedBy')
})


// update post with user ID
route.put('/post/:id', (req, res) => {
    Posts.findById(req.params.id,  (err, result) => {
        if (err) {
            console.log('Error deleting',err)
        } else {
           
            result.title = req.body.title;
            result.postbody = req.body.postbody
            result.tags = req.body.tags
            result.save()
            res.status(200).send(result)
        }
    })
})


// delete post by its ID
route.delete('/post/:id', async (req, res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: `post deleted`
        })
    } catch (error) {
        res.status(500).send(error)
    }   
})





module.exports = route