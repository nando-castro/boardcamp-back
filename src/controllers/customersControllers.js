import connection from "../db/database.js";

export async function getClients(req, res) {
  try {
    const { id } = req.params;
    const { cpf } = req.query;

    const params = [];
    let whereClause = "";

    if (cpf) {
      params.push(`${cpf}%`);
      whereClause += `WHERE cpf LIKE $${params.length}`;
      const clients = await connection.query(
        `SELECT * FROM customers ${whereClause}`,
        params
      );
      return res.status(200).send(clients.rows)
    }
    

    if (id) {
      const clients = await connection.query(
        `SELECT * FROM customers WHERE id = $1`,
        [id]
      );
      if (clients.rows.length > 0) {
        return res.status(200).send(clients.rows[0]);
      } else {
        return res.sendStatus(404);
      }
    }
    const clients = await connection.query(`SELECT * FROM customers`);
    res.status(200).send(clients.rows);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}

export async function registerClient(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;

    await connection.query(
      `INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function updateClient(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    const clientExists = await connection.query(
      `SELECT * FROM customers WHERE cpf = $1 AND id <> $2`,
      [cpf, id]
    );

    if (clientExists.rows.length > 0) {
      return res.sendStatus(409);
    }
    await connection.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}
