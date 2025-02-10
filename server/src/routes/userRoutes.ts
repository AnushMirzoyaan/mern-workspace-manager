import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { User } from "../models/User";

const router = express.Router();

router.get("/profile", authMiddleware, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
