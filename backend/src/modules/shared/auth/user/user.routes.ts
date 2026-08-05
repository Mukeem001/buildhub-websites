import { Router } from "express";
import { requireWebsiteScope } from "../../websiteScope";
import { ecommerceUserSignup, ecommerceUserLogin } from "./user.controller";

const router = Router();

router.post("/:websiteId/:websiteSlug/signup", requireWebsiteScope, ecommerceUserSignup);
router.post("/:websiteId/:websiteSlug/login", requireWebsiteScope, ecommerceUserLogin);

export default router;
