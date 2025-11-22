import express from "express"
import { adminLogin, approveCommentById, getAllBlogs, getAllComments, getDashBoard } from "../controllers/adminController.js"
import auth from "../middleware/auth.js"
import { deleteBlogById } from "../controllers/blogController.js"

const adminRouter=express.Router()


adminRouter.post("/login",adminLogin)
adminRouter.get("/comments",auth,getAllComments)
adminRouter.get("/blog",auth,getAllBlogs)
adminRouter.post("/delete-comment",auth,deleteBlogById)
adminRouter.post("/approve-comment",auth,approveCommentById)
adminRouter.get("/dashboard",auth,getDashBoard)




export default adminRouter