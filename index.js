const express = require("express");
const { Pool } = require("pg");
const app = express();
app.use(express.json());

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: "require",
});

console.log(pool);

app.get("/todos/get", async (req, res) => {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
});

app.post("/todos/add", async (req, res) => {
    const { title } = req.body;
    const result = await pool.query("INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *", [title, false]);
    res.status(201).json(result.rows[0]);
});

app.delete("/todos/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(204).end();
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
