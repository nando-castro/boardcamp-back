import connection from "../db/database.js";
import daysjs from "dayjs";

export async function getRentals(req, res) {
  try {
    const { id } = req.query;

    const rentals = await connection.query(`SELECT * FROM rentals`);
    res.status(200).send(rentals.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function registerRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = daysjs().format("YYYY-MM-DD");

    const game = await connection.query(`SELECT * FROM games WHERE id = $1`, [
      gameId,
    ]);

    if (game.rows.length === 0) {
      return res.sendStatus(400);
    }

    const gameRentals = await connection.query(
      `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
      [gameId]
    );

    if (gameRentals.rows.length >= game.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    const originalPrice = game.rows[0].pricePerDay * daysRented;

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, NULL, $5, NULL )`,
      [customerId, gameId, rentDate, daysRented, originalPrice]
    );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
