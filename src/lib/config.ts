import { z } from "zod";
import dotenv from 'dotenv';

// .envファイルの読み込み
dotenv.config();

// 環境変数のバリデーション
const envSchema = z.object({
  REDMINE_URL: z.string().url().optional(),
  REDMINE_API_KEY: z.string().optional(),
  MCP_SERVER_PORT: z.string().regex(/^\d+$/).optional(),
  SERVER_NAME: z.string().optional(),
  SERVER_VERSION: z.string().optional(),
});

// バリデーション実行
const validateEnv = (): z.infer<typeof envSchema> => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ 環境変数のバリデーションエラー:");
    console.error(result.error.errors);
    return process.env as z.infer<typeof envSchema>;
  }
  return result.data;
};

// バリデーション済み環境変数
const env = validateEnv();

// 設定オブジェクト
const config = {
  server: {
    name: process.env.SERVER_NAME ?? "@yonaka15/mcp-server-redmine",
    version: process.env.SERVER_VERSION ?? "0.1.0",
    port: parseInt(process.env.MCP_SERVER_PORT || "3000", 10),
  },
  redmine: {
    url: process.env.REDMINE_URL ?? "http://localhost:3001",
    apiKey: process.env.REDMINE_API_KEY ?? "",
  },
};

export default config;