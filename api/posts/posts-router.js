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
                 message: 'Error retriving the posts',
             })
         })
})
module.exports = router