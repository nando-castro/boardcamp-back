import { Router } from "express";
import { getGames, registerGames } from "../controllers/gamesControllers.js";
import validateGame from "../middlewares/validategame.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateGame, registerGames);

export default router;
