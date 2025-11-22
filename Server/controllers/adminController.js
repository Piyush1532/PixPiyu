import jwt from "jsonwebtoken";
import Blog from "../models/blogModel.js";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import Comment from "../models/commentModel.js";


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ success: false, message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getAllComments=async (req,res) => {
  try {
    const comments=await Comment.find({}).populate("blog").sort({createdAt:-1})
     res.json({ success: true, comments });
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
}

export const getDashBoard=async (req,res) => {
  try {
    const recentBlog=await Blog.find({}).sort({createdAt:-1}).limit(5)
const blog=await Blog.countDocuments()
const comments=await Comment.countDocuments()
const draft =await Blog.countDocuments({isPublished:false})
const dashBoardData={
  blog,comments,draft,recentBlog
}

res.json({success:true,dashBoardData})
  } catch (error) {
    res.json({ success: false, message: error.message }); 
  }
}


export const deleteCommentById=async (req,res) => {
  try {
    const{id}=req.body
    await Comment.findByIdAndDelete(id)

    //delete all comments related with the blog
await Comment.deleteMany({blog:id})
    res.json({success:true,message:"Comment deleted succesfully"})
  } catch (error) {
      res.json({ success: false, message: error.message }); 
  }
}



export const approveCommentById=async (req,res) => {
  try {
    const{id}=req.body
    await Comment.findByIdAndUpdate(id,{isApproved:true})
    res.json({success:true,message:"Comment deleted succesfully"})
  } catch (error) {
      res.json({ success: false, message: error.message }); 
  }
}