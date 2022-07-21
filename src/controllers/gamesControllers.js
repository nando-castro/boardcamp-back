import connection from "../db/database.js";

export async function getGames(req, res) {
  try {
    const { name } = req.query;
    let games;

    if (name) {
      games = await connection.query(
        `SELECT * FROM games WHERE name LIKE $1 || '%'`,
        [name]
      );
    } else {
      games = await connection.query(`SELECT * FROM games`);
    }

    res.status(200).send(games.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function registerGames(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    await connection.query(
      `INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
