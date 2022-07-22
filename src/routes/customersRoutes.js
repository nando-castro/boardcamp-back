import { Router } from "express";
import {
  getClients,
  registerClient,
  updateClient,
} from "../controllers/customersControllers.js";
import { validateClient } from "../middlewares/validateCustomrers.js";

const router = Router();

router.get("/customers", getClients);
router.get("/customers/:id", getClients);
router.post("/customers", validateClient, registerClient);
router.put("/customers/:id", updateClient);

export default router;
