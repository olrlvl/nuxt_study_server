import express from "express";
import pool from "../db.js";

const router = express.Router();

// Todo List
router.get("/list", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM todos");

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", additionalInfo: error });
    }
});

// Todo Add
router.post("/add", async (req, res, next) => {
    const { title } = req.body;

    // title이 없을 경우 400 에러를 반환
    if (!title) return res.status(400).json({ error: "text empty" });

    try {
        const result = await pool.query(
            "INSERT INTO todos (title, completed, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *",
            [title, false]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});
// Todo Delete
router.delete("/delete/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// Todo Complete Status Update
router.put("/complete/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);

        // 투두가 존재하지 않을 경우 404 에러를 반환
        if (todo.rows.length === 0) return res.status(404).json({ error: "Todo not found" });

        const completed = !todo.rows[0].completed;

        await pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id]);
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        next(error);
    }
});

export default router;
