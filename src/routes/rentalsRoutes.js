import { Router } from "express";
import {
  getRentals,
  registerRental,
} from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", registerRental);
router.put("/rentals");
router.delete("/rentals");

export default router;
