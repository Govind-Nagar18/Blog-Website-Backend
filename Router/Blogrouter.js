import { Router } from "express";
import { 
    getBlogs, 
    getMyBlogs, 
    CreateBlog, 
    UpdateBlog, 
    DeleteBlog 
} from "../Controller/Blogcontroller.js";
import authMiddleware from "../Middleware/Authmiddleware.js"; 

const router = Router();

router.get('/allblogs', getBlogs);
router.get('/myblog',authMiddleware, getMyBlogs);
router.post('/', authMiddleware, CreateBlog);
router.put('/:id', UpdateBlog);  
router.delete('/:id', DeleteBlog); 

export default router;
