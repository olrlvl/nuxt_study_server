export function errorHandler() {
    return function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("내부 서버 오류");
    };
}
