const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User' 
    },
    title: {
      type: String,
      required: [true, "A title is required"],
    },
    description: {
      type: String,
      required: [true, "You can't send an empty post"],
    },
    categories: [{
      type: String,
      required: [true, "You must select a category."],
      enum: ['Mindfulness', 'Finances', 'Health', 'Tech', 'Self Confidence']
    }],
    type: {
        type: String,
        required: [true, "You must select a type of post"],
        enum: ['Meeting', 'Knowledge']
    },
    image: {
        type: String,
        default: ""
    },
    upvotes: {
      type:[{ type: Schema.Types.ObjectId, ref: 'User'}],
        default: []
  },
    downvotes: {
      type:[{ type: Schema.Types.ObjectId, ref: 'User'}],
        default: []
  }, 
    /* upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }, */
    ranking : {
      type: Number,
      default: 0
    },
    commentsId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;