import connection from "../db/database.js";
import customersSchema from "../schemas/customersSchemas/customersSchema.js";

export async function validateClient(req, res, next) {
  try {
    const { name, phone, cpf, birthday } = req.body;

    const { error } = customersSchema.validate(req.body);

    if (error) {
      return res.sendStatus(422);
    }

    const clientExists = await connection.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );

    if (clientExists.rows.length > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
