import BlogModel from "../Model/Blogmodel.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate('user');
    res.json({ message: "All Blogs are Fetched", blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};


export const getMyBlogs = async (req, res) => {
  try {
    const myBlogs = await BlogModel.find({user:req.user._id}).populate('user');
    res.status(200).json({ message: "Your blogs fetched successfully", myBlogs });
  } catch (error) {
    console.error("Error fetching your blogs:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const CreateBlog = async (req, res) => {
  try {
    const { name, title, desc } = req.body;
    const blog = new BlogModel({ name, title, desc, user : req.user.id });
    await blog.save();
    res.status(201).json({ message: "Blog is Created", blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};


export const UpdateBlog = async (req, res) => {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedBlog) {
      res.json({ message: "Blog has Updated Successfully", blog: updatedBlog });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

export const DeleteBlog = async (req, res) => {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      res.json({ message: "Blog deleted successfully", blog: deletedBlog });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
