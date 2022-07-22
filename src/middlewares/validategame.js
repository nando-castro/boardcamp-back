import connection from "../db/database.js";
import gameSchema from "../schemas/gameSchemas/gameSchema.js";

export default async function validateGame(req, res, next) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const { error } = gameSchema.validate(req.body);

    if (error) {
      return res.status(422).send(error.details);
    }

    const gameExists = await connection.query(
      `SELECT * FROM games WHERE name = $1`,
      [name]
    );

    if (gameExists.rows.length > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
