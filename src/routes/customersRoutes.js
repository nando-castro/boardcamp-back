import { Router } from "express";
import {
  getClients,
  registerClients,
} from "../controllers/customersControllers.js";
import { validateClient } from "../middlewares/validateCustomrers.js";

const router = Router();

router.get("/customers", getClients);
router.post("/customers", validateClient, registerClients);
//router.update("/customers");

export default router;
