import { pool } from "../db/connection.js";

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro ao logar:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
}

export async function registerUser(req, res) {
  const {name, email, phone, password} = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email já cadastrado" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, password]
    );

    res.json({ success: true, user: result.rows[0] });
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
  } catch (error) {
    console.error("Erro ao registrar:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
}