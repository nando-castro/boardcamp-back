import { Router } from "express";
import {
  getRentals,
  registerRental,
  registerReturn,
  removeRentals,
} from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", registerRental);
router.post("/rentals/:id/return", registerReturn);
router.put("/rentals");
router.delete("/rentals/:id", removeRentals);

export default router;
