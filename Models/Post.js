import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: String,
    content: String,
    pfp:String
})

export default mongoose.model('Post', postSchema);