// 모듈 임포트
import express, { json } from "express";
import { errorHandler } from "./api/todo.js";
import registerRoutes from "./routes/index.js";
import createCompressionMiddleware from "./middleware/compression.js";

const compressionMiddleware = createCompressionMiddleware();

// 앱 및 미들웨어 설정
function configureApp() {
    // Express 애플리케이션을 생성
    const app = express();
    // JSON 미들웨어를 사용 요청 본문을 JSON으로 파싱
    app.use(json());
    // compression 미들웨어를 사용 HTTP 응답을 압축하여 전송합니다.
    app.use(compressionMiddleware);
    // 라우터를 등록
    registerRoutes(app);
    // 에러 핸들링 미들웨어
    app.use(errorHandler());
    return app;
}

const app = configureApp();
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
