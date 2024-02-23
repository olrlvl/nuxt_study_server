import rootRouter from "../api/root.js";
import todoRouter from "../api/todo.js";

export default function (app) {
    app.use("/", rootRouter);
    app.use("/todo", todoRouter);
}
