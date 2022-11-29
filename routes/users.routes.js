const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//Imported Models

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

//get public info about user profile
router.get("/:userId", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;

    try {
        const findUser = await User.findById(req.params.userId).populate("myPosts");
        console.log(findUser);
        res.json(findUser);
        const findMe = await User.findById(user);
        console.log(findMe);
        res.json(findMe);
    }
    catch (err) {
        console.log(err)
    }
});


// /set following - active user adds visited user-id to Following-Array
router.put("/:userId/set-following", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const userToFollow =req.params.userId 

    const findUser = await User.findById(user)
    const following = findUser.following 
    if (!following.includes(userToFollow) ){
        await User.findByIdAndUpdate(user, { $push: { following: userToFollow} })
    }   else {
        await User.findByIdAndUpdate(user, { $pull: { following: userToFollow} })
    } 
    
     res.json(findUser)
})

// /set follower - visited user gets active user added to Follower-Array
router.put("/:userId/set-follower", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const userToFollow =req.params.userId 

    const findUser = await User.findById(userToFollow)
    const follower = findUser.followers 

    if (!follower.includes(user) ){
        await User.findByIdAndUpdate(userToFollow, { $push: { followers: user} })
    }   else {
        await User.findByIdAndUpdate(userToFollow, { $pull: { followers: user} })
    } 

    res.json(findUser)
}) 


module.exports = router;