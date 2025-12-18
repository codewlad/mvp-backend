import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL5,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/users", async (req, res) => {
  const result = await pool.query("select * from users");
  res.json(result.rows);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Backend rodando na porta", PORT));
