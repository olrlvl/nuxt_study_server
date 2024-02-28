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
pool.connect((err) => {
    if (err) {
        console.error("데이터베이스 연결 에러", err.stack);
        console.log("에러 메시지:", err.message);
        console.log("에러 코드:", err.code);
        console.log("세부 정보:", err.detail);
        console.log("힌트:", err.hint);
        console.log("위치:", err.position);
        console.log("내부 위치:", err.internalPosition);
        console.log("내부 쿼리:", err.internalQuery);
        console.log("어디에서:", err.where);
        console.log("스키마:", err.schema);
        console.log("테이블:", err.table);
        console.log("컬럼:", err.column);
        console.log("데이터 타입:", err.dataType);
        console.log("제약 조건:", err.constraint);
        console.log("파일:", err.file);
        console.log("라인:", err.line);
        console.log("루틴:", err.routine);
    } else {
        console.log("데이터베이스 연결 성공");
    }
});

export default pool;
