import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "select id, name, email, created_at from public.users order by id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro /users:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
