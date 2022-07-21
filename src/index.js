import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRoutes.js";
import gamesRouter from "./routes/gamesRoutes.js";
/* import customersRouter from "./routes/customersRoutes.js";
import rentalsRouter from "./routes/rentalsRoutes.js"; */
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoryRouter);
app.use(gamesRouter);
/* app.use(customersRouter);
app.use(rentalsRouter); */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`);
});
