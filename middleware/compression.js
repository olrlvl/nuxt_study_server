import compression from "compression";

export default function createCompressionMiddleware() {
    return compression({
        level: 6, // 'level'은 압축 수준 설정 값은 -1(기본), 0(압축 없음)부터 9(최대 압축)까지 가능
        threshold: 100 * 1000, // 'threshold'는 압축을 시작할 최소 바이트 크기를 설정
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }

            return compression.filter(req, res);
        },
    });
}
