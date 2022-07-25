import connection from "../db/database.js";
import daysjs from "dayjs";

export async function getRentals(req, res) {
  try {
    const { customerId } = req.query;
    let rental;
    if (customerId) {
      rental = await connection.query(
        `SELECT * FROM rentals WHERE 'customerId' LIKE $1 || '%'`,
        [customerId]
      );
    } else {
      rental = await connection.query(`SELECT * FROM rentals`);
    }
    res.status(200).send(rental.rows);
  } catch (error) {
    res.status(500).send(error);
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

export async function registerReturn(req, res) {
  try {
    const { id } = req.params;

    const rental = await connection.query(
      `SELECT rentals."rentDate", rentals."daysRented", games."pricePerDay" FROM rentals JOIN games ON games.id = rentals."gameId" WHERE rentals.id = $1`,
      [req.params.id]
    );

    const { rentDate, daysRented, pricePerDay } = rental.rows[0];

    const dateNow = daysjs();

    const rentDuration = dateNow.diff(rentDate, "day");
    let delayFee = null;

    if (rentDuration > daysRented) {
      delayFee = (rentDuration - daysRented) * pricePerDay;
    }

    await connection.query(
      `UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id = $2`,
      [delayFee, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function removeRentals(req, res) {
  try {
    const { id } = req.params;
    const rental = await connection.query(
      `SELECT * FROM rentals WHERE id = $1 AND "returnDate" IS NOT NULL`,
      [id]
    );

    if (rental.rows.length > 0) {
      return res.sendStatus(400);
    }

    await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}
