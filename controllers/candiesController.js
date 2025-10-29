import { pool } from "../db/connection.js";

export async function listCandies(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM candies"
    );

    if (result.rows.length > 0) {
      res.json({ success: true, candies: result.rows });
    } else {
      res.status(401).json({ success: false, message: "Nenhum doce encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar doces:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
}

export async function createCandy(req, res) {
  try {
    console.log("req.body recebido:", req.body);
    const { name, type, descript, price, image, package_size, package_price } = req.body;

    console.log('Recebendo dados:', {
      name, type, descript, price, image, package_size, package_price
    });

    const result = await pool.query(
      `INSERT INTO candies (name, type, descript, price, image, package_size, package_price) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, type, descript, price, image, package_size, package_price]
    );

    console.log('Doce criado:', result.rows[0]);
    res.json({ success: true, candy: result.rows[0] });
  } catch (error) {
    console.error("Erro detalhado ao criar doce:", error.message);
    res.status(500).json({ success: false, message: "Erro ao criar doce" });
  }
}