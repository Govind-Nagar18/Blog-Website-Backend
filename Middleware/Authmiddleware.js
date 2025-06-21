import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../Model/UserModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // 2️⃣ Validate token format: should be "Bearer TOKEN"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: "Invalid token format. Use 'Bearer TOKEN'" });
    }

    const token = parts[1];

    // 3️⃣ Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_Secret);


    // 5️⃣ Verify if the user exists in the database
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Please create an account first." });
    }

    req.user = user;

    // 6️⃣ All checks passed, continue to next middleware/route
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token." });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired." });
    } else {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
};

export default authMiddleware;
