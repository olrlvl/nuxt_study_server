import express from "express";
import pool from "../db.js";

const router = express.Router();

// 할 일 목록 조회
router.get("/list", async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//할 일 추가
router.post("/add", async (req, res) => {
    const { title } = req.body;

    // title이 없을 경우 400 에러를 반환
    if (!title) res.status(400).json({ error: "Title is required" });

    try {
        const result = await pool.query("INSERT INTO todos (title, completed, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *", [
            title,
            false,
        ]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
