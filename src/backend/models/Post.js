const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// post
const postSchema = new Schema({
    post_id: String,
    user_id: String,
    post_type: String,
    time: {
        type: Date,
        default: Date.now
    },
    location: String,
    privacy: String, // friends, public or private
    text: String,
    photos: [String],  // mảng các link ảnh
    likes: Number,
    comments: Number,
    shares: String // được chia sẻ từ bài nào hay ko
});
module.exports = mongoose.module("post", postSchema);

// post like
const postLikeSchema = new Schema({
    user_id: String,
    post_id: String
});
module.exports = mongoose.module("postlike", postLikeSchema);

// comment
const commentSchema = new Schema({
    post_id: String,
    user_id: String,
    text: String,
    image: String,
    time: {
        type: Date,
        default: Date.now
    },
    likes: Number
})
module.exports = mongoose.module("comment", commentSchema )

// comment like
const commentLikeSchema = new Schema({
    comment_id: String,
    user_id: String,
});
module.exports = mongoose.module("postlike", commentLikeSchema);

