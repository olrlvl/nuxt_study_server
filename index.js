require("dotenv").config();

const list = require("./api/list");

const express = require("express");
const app = express();

const { Pool } = require("pg");

app.use(express.json());
app.use("/list", list);

const pg = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: { rejectUnauthorized: true },
    port: 5432,
});

pg.connect((err) => (err ? console.error("connection error", err.stack) : console.log("connected")));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/todos/get", async (req, res) => {
    const result = await pg.query("SELECT * FROM todos");
    res.json(result.rows);
});

// app.post("/todos/add", async (req, res) => {
//     const { title } = req.body;
//     const result = await pg.query("INSERT INTO todos (title, completed, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *", [title, false]);
//     res.status(201).json(result.rows[0]);
// });

// app.delete("/todos/delete/:id", async (req, res) => {
//     const id = parseInt(req.params.id);
//     await pg.query("DELETE FROM todos WHERE id = $1", [id]);
//     res.status(204).end();
// });

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
