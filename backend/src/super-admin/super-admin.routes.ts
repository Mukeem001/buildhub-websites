import { Router } from "express";

import * as Controller from "./super-admin.controller";

const router = Router();

router.post(
  "/login",
  Controller.login
);

router.get(
  "/dashboard",
  Controller.dashboard
);

router.get(
  "/profile",
  Controller.profile
);

router.get(
  "/websites",
  Controller.getAllWebsites
);

export default router;