import connection from "../db/database.js";

export async function getCategories(req, res) {
  const { rows: users } = await connection.query('SELECT * FROM categories');
    console.log(users);
    res.send(users);
}