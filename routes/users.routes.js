const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//Imported Models

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

//get public info about user profile
router.get("/:userId", async (req, res, next) => {
    try {
        const findUser = await User.findById(req.params.userId).populate("myPosts");
        console.log(findUser);
        res.json(findUser);
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
        const editUser = await User.findByIdAndUpdate(user, { $push: { following: userToFollow} })
    }   else {
        const editUser = await User.findByIdAndUpdate(user, { $pull: { following: userToFollow} })
    } 
    
     res.json(findUser)
})

// /set follower - visited user gets active user added to Follower-Array
router.put("/:userId/set-follwer", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const { email, password, profileImg, goals, myPreferences } = req.body;

    const editUser = await User.findByIdAndUpdate(user, {email: email, password: password, profileImg: profileImg, goals: goals, myPreferences: myPreferences})
    console.log(editUser)

    res.json(findUser)
}) 


module.exports = router;