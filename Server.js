import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./Router/Blogrouter.js";
import userrouter from "./Router/UserRouter.js";
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/blog", router);     
app.use("/auth", userrouter);   

// Start server
const PORT = process.env.PORT || 'https://blog-website-frontend-psi.vercel.app/';
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
