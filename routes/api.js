const express = require('express')
const mongoose = require('mongoose')

const Posts = require('../model/post')


const route = express.Router()


route.post('/post', (req, res) => {
    const postBody = req.body
    const post = new Posts(postBody)
    post.save( (err, result) => {
        if(err) {
            console.log('err')
        } else {
            res.status(200).send(result)
        }
    })
})

route.get('/post', async (req, res) => {
await Posts.find({}, (err, result ) => {
    if (err) {
        console.log(err)
    } else {
        res.status(200).send(result)
    }
}).sort( { updatedAt: -1 } )
})

route.get('/post/:id', async (req, res) => {
    Posts.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('data ', data)
            res.status(200).send(data)
        }
    })
})

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