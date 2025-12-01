import express from "express"
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogs, getAllComments, getDashBoard } from "../controllers/adminController.js"
import auth from "../middleware/auth.js"

const adminRouter=express.Router()


adminRouter.post("/login",adminLogin)
adminRouter.get("/comments",auth,getAllComments)
adminRouter.get("/blog",auth,getAllBlogs)
adminRouter.post("/delete-comment",auth,deleteCommentById)
adminRouter.post("/approve-comment",auth,approveCommentById)
adminRouter.get("/dashboard",auth,getDashBoard)




export default adminRouter