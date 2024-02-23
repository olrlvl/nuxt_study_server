// 모듈 임포트
import express, { json } from "express";
import registerRoutes from "./routes/index.js";
import createCompressionMiddleware from "./middleware/compression.js";

// 압축 미들웨어 생성
const compressionMiddleware = createCompressionMiddleware();

// 앱 및 미들웨어 설정
function configureApp() {
    const app = express();
    app.use(json());
    app.use(compressionMiddleware);
    registerRoutes(app);
    return app;
}

const app = configureApp();
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
