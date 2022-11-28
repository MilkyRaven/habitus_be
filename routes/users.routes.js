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

module.exports = router;