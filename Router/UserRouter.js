import { Router } from "express";
import authMiddleware from "../Middleware/Authmiddleware.js";
import { Signup, Login, Profile } from "../Controller/UserController.js";

const userrouter = Router()

userrouter.post('/signup', Signup);
userrouter.post('/login', Login);
userrouter.get('/profile', authMiddleware,  Profile);

export default userrouter