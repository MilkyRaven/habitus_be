const mongoose = require("mongoose")

// Require the models
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

const MONGO_URI = "mongodb://localhost:27017/project3"

//User seeds

const user = [
   {
      username: 'CreativeCarol',
      email: 'carol@mail.com',
      password:'123123',
      userStatus: 'Regular',
      profileImg: 'https://thumbs.dreamstime.com/b/cartoon-cute-panda-eating-bamboo-illustration-adorable-cartoon-cute-panda-eating-bamboo-illustration-211793106.jpg',
      goals: 'My goal is to learn about managing my finances better.',
      myPreferences: ['Finances', 'Mindfulness', 'Tech'], 
      myPosts: [], 
      mySavedPosts: [],
      myComments: [],
      myUpVotes: [],
      following: [],
      followers: []
   }, 

   {
      username: 'ImaginativeIvana',
      email: 'ivana@mail.com',
      password:'123123',
      userStatus: 'Regular',
      profileImg: 'https://img.freepik.com/free-vector/cute-panda-eating-burger-cartoon-vector-illustration-animal-food-concept-isolated-vector-flat-cartoon-style_138676-1936.jpg',
      goals: 'I would love to explore and search for other Surfers to improve my skills.',
      myPreferences: ['Health', 'Tech'], 
      myPosts: [], 
      mySavedPosts: [],
      myComments: [],
      myUpVotes: [],
      following: [],
      followers: []
   }, 

   {
      username: 'VersatileVicky',
      email: 'vicky@mail.com',
      password:'123123',
      userStatus: 'Regular',
      profileImg: 'https://img.freepik.com/premium-vector/cute-panda-eating-salmon-sushi-with-chopsticks-cartoon-icon-illustration_138676-2667.jpg?w=2000',
      goals: 'I am looking to improve my inner peace.',
      myPreferences: ['Tech', 'Mindfulness', 'Self Confidence'], 
      myPosts: [], 
      mySavedPosts: [],
      myComments: [],
      myUpVotes: [],
      following: [],
      followers: []
   }, 
]

// const post = [
//    {
//       creator:"637e001e16b75b0151326214", //we need user Ids first
//       title: "How I improved my self-confidence through reading",
//       description: "Lorem ipsum",
//       categories: ['Self Confidence'],
//       type: 'Knowledge',
//       upvotes: 0,
//       downvotes: 0,
//       commentsId: []
//    },
//    {
//       creator: "637e001e16b75b0151326214", //we need user Ids first
//       title: "Learn how to save money more efficiently",
//       description: "Lorem ipsum",
//       categories: ['Finances'],
//       type: 'Knowledge',
//       upvotes: 0,
//       downvotes: 0,
//       commentsId: []
//    },
//    {
//       creator: "637e001e16b75b0151326214", //we need user Ids first
//       title: "Climbing and living in the present",
//       description: "Lorem ipsum",
//       categories: ['Health', 'Mindfulness'],
//       type: 'Knowledge',
//       upvotes: 0,
//       downvotes: 0,
//       commentsId: []
//    }
// ]
// const comment = [
//    {
//       creator: "637e001e16b75b0151326214", //we need user Id first
//       content: "I really like this post! Thank you!",
//       ofPost: {}, //we need post Id first
//       replies: []
//    },
//    {
//       creator: "637e001e16b75b0151326214", //we need user Id first
//       content: "I would like to add this link to find climbing places",
//       ofPost: {}, //we need post Id first
//       replies: []
//    }
// ]

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
