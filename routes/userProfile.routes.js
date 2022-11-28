const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//Imported Models

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")


//Get Routes

// /my-profile/
router.get("/", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;

    const findUser = await User.findById(user)

    res.json(findUser)
})

// /my-profile/myposts
router.get("/my-posts", isAuthenticated, async (req, res, next) => {
    try {
        const user = req.payload._id;
        const findUser = await User.findById(user).populate("myPosts")
        const myPostsArray = findUser.myPosts; 
        console.log(findUser)
        res.json(myPostsArray);
    }
    catch(err){console.log(err)}
})

// /my-profile/library
router.get("/library", isAuthenticated, async (req, res, next) => {
    try {
        const user = req.payload._id;
        const findUser = await User.findById(user).populate("mySavedPosts").populate({
            path: "mySavedPosts",
            populate: {
                path: "creator",
                model: "User"
            }
        });
        const mySavedPosts = findUser.mySavedPosts;
        res.json(mySavedPosts)   
    }
    catch(err){console.log(err)}
})

// /my-profile/my-inspirers
router.get("/my-inspirers", (req, res, next) => {
    res.json("These are my Inspirers. 🐼")
})

// /my-profile/my-friends
router.get("/my-friends", isAuthenticated, async (req, res, next) => {
    const user = req.payload;
    const findUser = await User.findById(user).populate("friends")
    res.json(findUser)
})



//Post Routes





//Put Routes 

// /my-profile/edit
router.put("/edit", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const { email, password, profileImg, goals, myPreferences } = req.body;

    const editUser = await User.findByIdAndUpdate(user, {email: email, password: password, profileImg: profileImg, goals: goals, myPreferences: myPreferences})
    console.log(editUser)

    res.json("You can edit your profile here. 📝")
})

// my-profile/library/:postId/delete

router.put("/library/:postId/delete", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const postId = req.params.postId;
    const editUser = await User.findByIdAndUpdate(user, {$pull: {mySavedPosts: postId }})
    console.log(editUser)

    res.json("You have unsaved a post")
})







module.exports = router;
