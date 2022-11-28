const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.post("/upload", fileUploader.single("image"),isAuthenticated, async (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    try {
        const newUploade = await fileUploader.upload(req.file)
        res.json({ fileUrl: req.file.path }, "Here you can make a post! Awesome, right?");
    }
    catch (err) {
        console.log(err)
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });