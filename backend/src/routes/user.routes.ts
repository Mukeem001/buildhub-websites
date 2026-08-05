import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  getAllUsers,
  getCurrentUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import { deleteUserById, bulkDeleteUsers, updateUserById, getUserById } from "../controllers/user.controller";

const router = Router();

router.get("/me", authMiddleware, getCurrentUserProfile);
router.put("/me", authMiddleware, updateUserProfile);
router.get("/", authMiddleware, getAllUsers);

router.get("/:id", authMiddleware, getUserById);

router.delete("/:id", authMiddleware, deleteUserById);
router.post("/bulk-delete", authMiddleware, bulkDeleteUsers);
router.patch("/:id", authMiddleware, updateUserById);

export default router;
