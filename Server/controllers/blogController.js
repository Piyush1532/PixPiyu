import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished,author } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile|| !author) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileData = fs.readFileSync(imageFile.path, { encoding: "base64" });

    const response = await imagekit.files.upload({
      file: fileData,
      fileName: imageFile.originalname,
      folder: "/blogsImages",
    });

    // FIXED: url() → getUrl()
   const optimizeImageUrl = `${imagekit._options.urlEndpoint}${response.filePath}?tr=w-1280,f-webp,q-auto`;
("File Path:", response.filePath);

    await Blog.create({
      title,
      subTitle,
      author,
      description,
      category,
      image: optimizeImageUrl,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const getAllBlogs=async (req,res) => {
  try {
    const blogs=await Blog.find({isPublished:true})
    res.json({ success: true, blogs });
  } catch (error) {
      res.json({ success: false, message: error.message })
  }
}


export const getBlogById=async (req,res) => {
 try {
  const {blogId}=req.params
  const blog=await Blog.findById(blogId)
  if (!blog) {
    return res.json({success:false,message:"Blog not found"})
  }
  res.json({success:true,blog})
 } catch (error) {
    res.json({ success: false, message: error.message })
 } 
}

export const deleteBlogById=async (req,res) => {
 try {
  const {id}=req.body
await Blog.findByIdAndDelete(id)

      return res.json({success:true,message:"Blog deleted sucessfully"})
  
 } catch (error) {
    res.json({ success: false, message: error.message })
 } 
}


export const togglePublish=async (req,res) => {
  try {
    const {id}=req.body
    const blog=await Blog.findById(id)
    blog.isPublished=!blog.isPublished
    await blog.save()
      return res.json({success:true,message:"Blog status updated"})
  } catch (error) {
     res.json({ success: false, message: error.message })
  }
}

export const addComment=async (req,res) => {
  try {
    const {blog,name,content}=req.body
    await Comment.create({
      blog,
      name,
      content
    })
     res.json({ success: true, message: "Comment Added for Review" }) 
  } catch (error) {
    res.json({ success: false, message: error.message }) 
  }
}


export const getBlogComments=async (req,res) => {
  try {
    const {blogId}=req.body
    const comments=await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1})
    res.json({success:true,comments})
  } catch (error) {
     res.json({ success: false, message: error.message }) 
  }
}