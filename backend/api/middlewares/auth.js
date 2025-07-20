import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyAuth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({ statusCode: 401, message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Admin tokens may not map to User collection (if using env admin)
    if (decoded.role === "admin") {
      req.user = { id: "ADMIN", role: "admin", username: process.env.ADMIN_USERNAME };
      return next();
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ statusCode: 401, message: "Invalid token user." });
    }
    req.user = { ...user.toObject(), role: "user" };
    next();
  } catch (err) {
    return res.status(401).json({ statusCode: 401, message: "Token invalid or expired." });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ statusCode: 403, message: "Admin access required." });
  }
  next();
};
