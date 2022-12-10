import express from "express";
import {
  getUserInformation,
  login,
  register,
} from "../controllers/userController.js";

// Middlewares
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Registration
router.route("/register").post(register);

// User Login
router.route("/login").post(login);

// Get User Info
router.route("/get-user-info").post(authMiddleware, getUserInformation);

export default router;
