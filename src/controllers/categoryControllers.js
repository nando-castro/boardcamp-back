import connection from "../db/database.js";

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(
      `SELECT * FROM categories`
    );
    res.status(200).send(categories);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function registerCategories(req, res) {
  try {
    const { name } = req.body;

    await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
