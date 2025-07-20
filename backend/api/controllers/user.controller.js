import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ statusCode: 200, users, message: "Users fetched successfully."})
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message})
    }
}

const createUser = async(req, res) => {
    const { username, email, password } = req.body;
    console.log("user create", username, email, password)
    try {
        if([username, email, password].some((val) => val.trim() === "")){
            return res.status(400).json({ statusCode: 400, message: "All fields are required."})
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ statusCode: 400, message: "Email already registered." });
        }

        const user = await User.create({
            username,
            email,
            password
        })
        return res.status(200).json({ statusCode: 200, user, message: "User registered successfully."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ statusCode: 500, message: error.message})
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    console.log("login karne aaye hain",email, password)
    if (!email || !password) {
        return res.status(400).json({ statusCode: 400, message: "Email & password required." });
    }
    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({ statusCode: 401, message: "Invalid credentials." });
        }
        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch){
            return res.status(401).json({ statusCode: 401, message: "Invalid credentials."})
        }
        const token = generateToken({ id: user._id, role: "user" });

        return res.status(200).json({
            statusCode: 200,
            token,
            user: { id: user._id, username: user.username, email: user.email },
            message: "Login successful."
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message })
    }
}

const loginAdmin = async (req, res) => {
  const { username, password } = req.body || {};
    console.log("login karne aaye hain",username, password)
  if ([username, password].some(v => typeof v !== "string" || v.trim() === "")) {
    return res.status(400).json({ statusCode: 400, message: "Username & password required." });
  }

  try {
    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ statusCode: 401, message: "Invalid admin credentials." });
    }

    const token = generateToken({ role: "admin", admin: true });

    return res.status(200).json({
      statusCode: 200,
      token,
      admin: { username: process.env.ADMIN_USERNAME, role: "admin" },
      message: "Admin login successful."
    });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  // req.user is set by verifyAuth middleware
  return res.status(200).json({
    statusCode: 200,
    user: req.user,
    message: "Current user fetched."
  });
};

export {
    getUsers,
    createUser,
    loginUser,
    loginAdmin,
    getCurrentUser
}