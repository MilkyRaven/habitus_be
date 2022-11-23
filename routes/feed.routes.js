const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//imported models
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

//get routes
router.get("/", (req, res, next) => {
  res.json("This is the feed organized by most popular posts! ⭐️");
});

router.get("/following", (req, res, next) => {
    res.json("This is the feed organized by the people you follow 🙌🏼");
  });

router.get("/fresh", (req, res, next) => {
    res.json("This is the feed organized by newest posts 🚀");
  });

router.get("/:postId", async (req, res, next)=> {
    try{
        const findPost = await Post.findById(req.params.postId);
        console.log(findPost);
        res.json("We are inside this individual post");
    }
    catch(err){
        console.log(err)
    }
});

    //save post
router.put("/:postId/save", isAuthenticated, async (req, res, next)=> {
    try{
        const savedPostId = req.params.postId
        const user = req.payload._id
        const editUser = await User.findByIdAndUpdate(user, {$push: {mySavedPosts: savedPostId}}, {new: true})
        console.log(editUser)
    }
    catch(err){
        console.log(err)
    }
})
// create a comment
    router.post("/:postId/new-comment", isAuthenticated, async (req, res, next)=> {
        const {content} = req.body;
        const postId = req.params.postId;
        const user = req.payload._id;
        const newComment = await Comment.create({creator: user, content: content, ofPost: postId})
        console.log(newComment);
    })
  //post routes
  router.post("/new-post", isAuthenticated, async (req, res, next) => {
    try {
        const user = req.payload._id;
        const {title, description, categories, type, image} = req.body;
        const newPost = await Post.create({creator: user, title: title, description: description, categories: categories, type: type, image: image})
        console.log(newPost);
        res.json("Here you can make a post"); 
    }
    catch(err) {
        console.log(err)
    }
  });
  


module.exports = router;