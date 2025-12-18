
import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT now() as server_time");
  res.json(result.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
