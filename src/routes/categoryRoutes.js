import { Router } from "express";
import { getCategories } from "../controllers/categoryControllers.js";

const router = Router();

router.get("/categories", getCategories);
//router.post("");

export default router;
