import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4, // ⬅️ FORÇA IPv4
});

app.get("/", (req, res) => {
  res.status(200).send("API rodando 🚀");
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "select id, name, email, created_at from public.users order by id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
