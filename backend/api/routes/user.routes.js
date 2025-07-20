import { Router } from "express";

const route = Router();

import { getUsers, createUser, loginUser, loginAdmin, getCurrentUser } from "../controllers/user.controller.js";
import { verifyAuth, verifyAdmin } from "../middlewares/auth.js";

// User routes
route.get("/accounts", verifyAdmin, getUsers);
route.post("/account", createUser);
route.post("/admin/login", loginAdmin);
route.post("/login", loginUser);
route.get("/current-user", verifyAuth, getCurrentUser);

export default route;