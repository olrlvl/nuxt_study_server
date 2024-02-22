// 모듈 임포트
import express, { json } from "express";
import pool from "./db.js";

// 앱 및 미들웨어 설정
const app = express();
app.use(json());

// 데이터베이스 연결 상태
pool.connect((err) => (err ? console.error("연결 에러", err.stack) : console.log("연결 성공")));

// 라우트 설정
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/todos/get", async (req, res) => {
    const result = await pool.query("SELECT * FROM todos");
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
