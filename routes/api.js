const express = require('express')
const mongoose = require('mongoose')

const Posts = require('../model/post')
const Users = require('../model/user')



const route = express.Router()


// create a new post
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
    }).sort( { updatedAt: -1 } ).populate('postedBy')
})

// get post by its ID
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


// update post with user ID
route.put('/post/:id', (req, res) => {
    Posts.findById(req.params.id,  (err, result) => {
        if (err) {
            console.log('Error deleting',err)
        } else {
           
            result.title = req.body.title;
            result.postbody = req.body.postbody
            
            result.save()
            res.status(200).send(result)
        }
    })
})

// route.delete('/post/:id', (req, res) => {
//     Posts.findByIdAndDelete(req.params.id, (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.status(200).send(result)
//             console.log('data deleted successfully')
//         }
//     })
// })


// route.delete('/post/:id', async (req, res) => {
//     const post = await Posts.findByIdAndDelete(req.params.id);
//     if (!post) {
//         return res.status(404).send('Post not found!')
//     }
//     return res.status(200).send(`${req.body.title} deleted`)
// })

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



// // practice
// route.get('/post/users/:id', async (req, res) => {
//     const userDoc = req.body
//     const authorId = new Users(userDoc)
//     console.log(authorId._id)
//     Users.findOne({authorId}, (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('user post not  ', data)
//             res.status(200).send(data)
//         }
//     }).populate('postedBy')
    
// })









module.exports = route