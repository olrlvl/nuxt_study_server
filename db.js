import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: { rejectUnauthorized: true },
    port: 5432,
});

// 데이터베이스 연결 상태
pool.connect((err) =>
    err ? console.error("데이터베이스 연결 에러", err.stack) : console.log("데이터베이스 연결 성공")
);

export default pool;
