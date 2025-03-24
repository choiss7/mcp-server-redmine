import { z } from "zod";
import dotenv from 'dotenv';
// .envファイルの読み込み
dotenv.config();
// 設定スキーマの定義
const ConfigSchema = z.object({
    // RedmineのAPI設定
    redmine: z.object({
        apiKey: z.string({
            required_error: "REDMINE_API_KEY environment variable is required",
        }),
        host: z
            .string({
            required_error: "REDMINE_HOST environment variable is required",
        })
            .url("REDMINE_HOST must be a valid URL"),
    }),
    // サーバー設定
    server: z.object({
        name: z.string().default("@yonaka15/mcp-server-redmine"),
        version: z.string().default("0.1.0"),
        port: z.coerce.number().default(3000),
    }),
});
// 環境変数からの設定読み込み
function loadConfig() {
    var _a, _b;
    return ConfigSchema.parse({
        redmine: {
            apiKey: process.env.REDMINE_API_KEY,
            host: process.env.REDMINE_HOST,
        },
        server: {
            name: (_a = process.env.SERVER_NAME) !== null && _a !== void 0 ? _a : "@yonaka15/mcp-server-redmine",
            version: (_b = process.env.SERVER_VERSION) !== null && _b !== void 0 ? _b : "0.1.0",
            port: parseInt(process.env.MCP_SERVER_PORT || "3000", 10),
        },
    });
}
// 設定のバリデーションとエクスポート
let config;
try {
    config = loadConfig();
}
catch (error) {
    if (error instanceof z.ZodError) {
        console.error("Configuration error:");
        error.errors.forEach((err) => {
            console.error(`- ${err.path.join(".")}: ${err.message}`);
        });
    }
    else {
        console.error("Unknown error loading configuration:", error);
    }
    process.exit(1);
}
export default config;
//# sourceMappingURL=config.js.map