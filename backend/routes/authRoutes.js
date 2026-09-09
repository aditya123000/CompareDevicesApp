import express from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser, updateProfile, changePassword } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.post("/logout", protect, logoutUser);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, changePassword);

export default router;
