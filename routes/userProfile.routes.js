const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//Imported Models

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")


//Get Routes

// /my-profile/
router.get("/", (req, res, next) => {
    res.json("This is my User Profile. 👩‍💻")
})

// /my-profile/library
router.get("/library", isAuthenticated, async (req, res, next) => {
    const user = req.payload._id;

    const findUser = await User.findById(user).populate("mySavedPosts")

    res.json("This is my Library. 📚") // (findUser) to show the populate
})

// /my-profile/my-inspirers
router.get("/my-inspirers", (req, res, next) => {
    res.json("These are my Inspirers. 🐼")
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







module.exports = router;
