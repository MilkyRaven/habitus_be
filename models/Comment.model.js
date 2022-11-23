const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    creator: {
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    content: {
      type: String,
      required: [true, "Your comment must have some content"],
    },
    ofPost: {
      type: Schema.Types.ObjectId, ref: 'Post' 
    },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;