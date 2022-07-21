import connection from "../db/database.js";

export default async function validateNameCategory(req, res, next) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const categoryExists = await connection.query(
      `SELECT * FROM categories WHERE name = $1`,
      [name]
    );

    if (categoryExists.rows.length > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
