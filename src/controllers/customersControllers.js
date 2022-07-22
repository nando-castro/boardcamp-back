import connection from "../db/database.js";

export async function getClients(req, res) {
  try {
    const { rows: clients } = await connection.query(`SELECT * FROM customers`);
    res.status(200).send(clients);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function registerClients(req, res) {
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
