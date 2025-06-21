import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    name: String,
    title: String,
    desc: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const BlogModel = mongoose.model('Blog', BlogSchema);

export default BlogModel;
