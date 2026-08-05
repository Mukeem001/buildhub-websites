import { Router } from "express";
import { createModuleAuthRouter } from "./moduleAuth";

const router = Router();

router.use("/", createModuleAuthRouter({ moduleName: "ecommerce", templateSlug: "ecommerce" }));

export default router;
