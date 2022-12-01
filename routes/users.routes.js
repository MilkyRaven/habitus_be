const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//Imported Models

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

//get all users data

router.get("/all", isAuthenticated, async (req, res, next) => {

    try {
        const findAllUsers = await User.find();
        console.log(findAllUsers);
        res.json(findAllUsers);
    }
    catch (err) {
        console.log(err)
    }
});


//get all our followers
router.get("/followers", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;

    try {
        const findUser = await User.findById(user).populate("followers");
        console.log(findUser);
        res.json(findUser);
    }
    catch (err) {
        console.log(err)
    }
});

//get all the users we follow
router.get("/following", isAuthenticated, async (req, res, next) => {

    const user = req.payload._id;

    try {
        const findUser = await User.findById(user).populate("following");
        console.log(findUser);
        res.json(findUser);
    }
    catch (err) {
        console.log(err)
    }
});

//get mutuals
router.get("/mutuals", isAuthenticated, async (req, res, next) => {
    const user = req.payload
    // console.log(user);
        try {
        const mutuals = [];
        const followingArray = user.following;
        const followersArray = user.followers;
        const followingData = [];
        const followersData = [];
        
        //following
        for (let i = 0; i < followingArray.length; i++){
            // console.log(followingArray[i]);
            const followingSearch = await User.findById(followingArray[i]);
            followingData.push(followingSearch)
            // console.log("I'm following:", followingSearch);
        }

        //followers
        for (let i = 0; i < followersArray.length; i++){
            const followersSearch = await User.findById(followersArray[i]);
            followersData.push(followersSearch)
            // console.log("Following me:", followersSearch);
        }

            followingData.map((follower)=> { 
                console.log("this is the follower", follower._id)
                followersData.map((following)=>{
                    console.log("this is the following", following._id);
                    if (String(follower.id) === String(following.id)) {
                        return mutuals.push(following);
                    }
                })
            })

            console.log("mutuaaaals", mutuals);
        res.json(mutuals);

    } catch (error) {
        console.log(error)
    }
});

//get public info about user profile
router.get("/:userId", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;

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
    const userToFollow = req.params.userId

    const findUser = await User.findById(user)
    const following = findUser.following
    if (!following.includes(userToFollow)) {
        await User.findByIdAndUpdate(user, { $push: { following: userToFollow } })
    } else {
        await User.findByIdAndUpdate(user, { $pull: { following: userToFollow } })
    }

    res.json(findUser)
})

// /set follower - visited user gets active user added to Follower-Array
router.put("/:userId/set-follower", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const userToFollow = req.params.userId

    const findUser = await User.findById(userToFollow)
    const follower = findUser.followers

    if (!follower.includes(user)) {
        await User.findByIdAndUpdate(userToFollow, { $push: { followers: user } })
    } else {
        await User.findByIdAndUpdate(userToFollow, { $pull: { followers: user } })
    }

    res.json(findUser)
})

// /follow
router.put("/:userId/follow", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const userToFollow = req.params.userId
    
    const currentUserData = await User.findByIdAndUpdate(user, { $push: { following: userToFollow } })
    const userData = await User.findByIdAndUpdate(userToFollow, { $push: { followers: user } })

    res.json({ currentUserData, userData })
})

// /unfollow
router.put("/:userId/unfollow", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const userToFollow = req.params.userId

    const currentUserData = await User.findByIdAndUpdate(user, { $pull: { following: userToFollow } })
    const userData = await User.findByIdAndUpdate(userToFollow, { $pull: { followers: user } })

    res.json({ currentUserData, userData })
})


module.exports = router;