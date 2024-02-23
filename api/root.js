import express from "express";

let router = express.Router();

router.get("/", function (req, res) {
    const payload = "root test root test root test root test root test root test root test root test root test root test root test root test";
    res.send(payload.repeat(10000));
});

export default router;
