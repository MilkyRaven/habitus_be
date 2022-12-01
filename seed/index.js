const mongoose = require("mongoose")

// Require the models
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

const MONGO_URI = "mongodb://localhost:27017/project3"

const createSeeds = async function () {
   try {
      const connect = await mongoose.connect(MONGO_URI)
      console.log(`Connected to database: ${connect.connections[0].name}`)

      const dbUsers = await User.create(user)
      console.log(`Users created`)

      const dbClose = await mongoose.connection.close()
      console.log("Seeds created")
   } catch (err) {
      console.log(`Error creating the seeds: ${err}`)
   }
}

createSeeds()
