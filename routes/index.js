import rootRouter from "../api/root.js";
import todoRouter from "../api/todo.js";

export default function (app) {
    // 루트
    app.use("/", rootRouter);
    // Todo
    app.use("/todo", todoRouter);
}
