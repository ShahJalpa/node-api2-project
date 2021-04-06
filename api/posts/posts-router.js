// implement your posts router here
const Posts = require("./posts-model.js");
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
         .then(posts => {
             res.status(200).json(posts);
         })
         .catch(error => {
             res.status(500).json({
                message: "The posts information could not be retrieved",
             })
         })
})

router.get('/:id', (req, res) =>{
    Posts.findById(req.params.id)
         .then(post => {
            if(post){
                res.status(200).json(post)
            }else{
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
         })
         .catch(error => {
             console.log(error)
             res.status(500).json({
                message: "The post information could not be retrieved"
             })
         })
})

router.post('/', (req, res) => {
    const newPost = req.body
    console.log(newPost.title, newPost.contents)
    if(!newPost.title || !newPost.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post" 
        })
    }else{
        Posts.insert(newPost)
             .then(post => {
                 res.status(201).json(post)
             })
             .catch(error => {
                 res.status(500).json({
                    message: "There was an error while saving the post to the database"
                 })
             })
    }
})

router.put('/:id', (req, res) =>{
    const {id} =req.params
    const updatePost = req.body

    if(!updatePost.title || !updatePost.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }else{
        Posts.update(id, updatePost)
             .then(post =>{
                 if(!post){
                     res.status(404).json({
                        message: "The post with the specified ID does not exist"
                     })
                 }else{
                     res.status(200).json(post)
                 }
             })
             .catch(error => {
                 res.status(500).json({
                    message: "The post information could not be modified"
                 })
             })
    }
})

router.delete('/:id', async(req, res) => {
    try{
          const {id} =req.params
          const deletePost = await Posts.remove(id)
    
          if(!deletePost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
          }else{
            res.status(200).json(deletePost)
          }
    }
    catch{
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
  
})
module.exports = router