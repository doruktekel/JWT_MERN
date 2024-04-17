import express from "express";
const router = express.Router();
import {
  register,
  test,
  login,
  profileInfo,
} from "../controllers/authControllers.js";

router.get("/", test);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", profileInfo);

export default router;
