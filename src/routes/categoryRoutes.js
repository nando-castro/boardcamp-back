import { Router } from "express";
import {
  getCategories,
  registerCategories,
} from "../controllers/categoryControllers.js";
import validateNameCategory from "../middlewares/validateCategory.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", validateNameCategory, registerCategories);

export default router;
