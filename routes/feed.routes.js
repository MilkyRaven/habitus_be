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



//           const newReview = await Review.create({userId: user, username: user.username, comicId: comicId, title: title, content: description, rating: quantity})
//           //console.log(newReview)
//           //average review
//           res.redirect("/")
//       }
//       catch(err){console.log(err)}
//    })
  


module.exports = router;