import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { listAllowOrigins, createAllowOrigin, deleteAllowOrigin } from "../controllers/allowOrigin.controller";

const router = Router();

router.get("/", authMiddleware, listAllowOrigins);
router.post("/", authMiddleware, createAllowOrigin);
router.delete("/:id", authMiddleware, deleteAllowOrigin);

export default router;
