const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//imported models
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

//get routes
router.get("/", isAuthenticated, async (req, res, next) => {
    let preferedPosts = [];
    let sortedPosts;
    try {

        //first, we check the user preferences
        const user = req.payload._id;
        const findUser = await User.findById(user);
        const { myPreferences } = findUser

        //then, we find posts related to preferences
        const findPosts = await Post.find();
        findPosts.filter((post) => {
            post.categories.forEach((category) => {
                myPreferences.forEach((preference) => {
                    if (category === preference) {
                        preferedPosts.push(post);
                    }
                })

            })
        })

        //then, we sort the post based on ranking
        sortedPosts = [...preferedPosts].sort((a, b) => {
            if (a.ranking < b.ranking) return 1;
            if (a.ranking > b.ranking) return -1;
            return 0;
        })
    }
    catch (err) { console.log(err) }
    res.json(sortedPosts);
});

router.get("/following", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;
    const findUser = await User.findById(user);
    //find friends posts
    const myFriendsPosts = [];
    const myFriends = findUser.friends;

    for (let i = 0; i < myFriends.length; i++) {
        const searchingPosts = await Post.find({ creator: myFriends[i] })
        myFriendsPosts.push(searchingPosts);
    }
    //then we sort based on time created
    const allPosts = [];
    myFriendsPosts.forEach((friend)=> {
        friend.forEach((post)=> {
            allPosts.push(post);
        })
    })

    friendSortedPosts = [...allPosts].sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
    })
    res.json(friendSortedPosts);
});

router.get("/fresh", isAuthenticated, async (req, res, next) => {
    let preferedPosts = [];
    let sortedPosts;
    try {

        //first, we check the user preferences
        const user = req.payload._id;
        const findUser = await User.findById(user);
        const { myPreferences } = findUser

        //then, we find posts related to preferences
        const findPosts = await Post.find();
        findPosts.filter((post) => {
            post.categories.forEach((category) => {
                myPreferences.forEach((preference) => {
                    if (category === preference) {
                        preferedPosts.push(post);
                    }
                })

            })
        })

        //then, we sort the post based on date
        sortedPosts = [...preferedPosts].sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        })
    }
    catch (err) { console.log(err) }

    res.json(sortedPosts);
});

router.get("/:postId", async (req, res, next) => {
    try {
        const findPost = await Post.findById(req.params.postId);
        console.log(findPost);
        res.json("We are inside this individual post");
    }
    catch (err) {
        console.log(err)
    }
});

//save post
router.put("/:postId/save", isAuthenticated, async (req, res, next) => {
    try {
        const savedPostId = req.params.postId
        const user = req.payload._id
        const editUser = await User.findByIdAndUpdate(user, { $push: { mySavedPosts: savedPostId } }, { new: true })
        console.log(editUser)
    }
    catch (err) {
        console.log(err)
    }
})
// create a comment
router.post("/:postId/new-comment", isAuthenticated, async (req, res, next) => {
    const { content } = req.body;
    const postId = req.params.postId;
    const user = req.payload._id;
    const newComment = await Comment.create({ creator: user, content: content, ofPost: postId })
    console.log(newComment);
})
//post routes
router.post("/new-post", isAuthenticated, async (req, res, next) => {
    try {
        const user = req.payload._id;
        const { title, description, categories, type, image } = req.body;
        const newPost = await Post.create({ creator: user, title: title, description: description, categories: categories, type: type, image: image })
        console.log(newPost);
        res.json("Here you can make a post! Awesome, right?");
    }
    catch (err) {
        console.log(err)
    }
});



module.exports = router;