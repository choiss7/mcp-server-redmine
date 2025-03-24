import config from "../config.js";
/**
 * Redmine API クライアントエラー
 */
export class RedmineApiError extends Error {
    constructor(status, statusText, errors) {
        super(`Redmine API error: ${status} ${statusText}\n${errors ? errors.join(", ") : "Unknown error"}`);
        this.status = status;
        this.statusText = statusText;
        this.errors = errors;
        this.name = "RedmineApiError";
    }
}
/**
 * Redmine API クライアント
 */
export class BaseClient {
    /**
     * Redmine APIにリクエストを送信
     */
    async performRequest(path, options) {
        const url = new URL(path, config.redmine.host);
        // デフォルトのリクエストオプション
        const defaultOptions = {
            method: 'GET',
            headers: {
                "X-Redmine-API-Key": config.redmine.apiKey,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            // タイムアウトの設定
            signal: AbortSignal.timeout(30000), // 30秒
        };
        // オプションのマージ（ヘッダーは個別にマージ）
        const requestOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options === null || options === void 0 ? void 0 : options.headers,
            },
        };
        try {
            const response = await fetch(url.toString(), requestOptions);
            // エラーレスポンスの詳細なハンドリング
            if (!response.ok) {
                let errorMessage;
                const contentType = response.headers.get("content-type");
                if (contentType === null || contentType === void 0 ? void 0 : contentType.includes("application/json")) {
                    try {
                        const errorResponse = await response.json();
                        errorMessage = errorResponse.errors || ["Unknown error"];
                    }
                    catch (_a) {
                        errorMessage = [`Failed to parse error response: ${await response.text() || "Empty response"}`];
                    }
                }
                else {
                    // JSONでない場合はテキストとして読み取り
                    errorMessage = [await response.text() || "Unknown error"];
                }
                throw new RedmineApiError(response.status, response.statusText, errorMessage);
            }
            // 204 No Content
            if (response.status === 204) {
                return {};
            }
            // レスポンスのパース
            try {
                return await response.json();
            }
            catch (error) {
                throw new RedmineApiError(response.status, "Failed to parse response", [error.message]);
            }
        }
        catch (error) {
            // ネットワークエラーやタイムアウトの処理
            if (error instanceof RedmineApiError) {
                throw error;
            }
            throw new RedmineApiError(0, "Network Error", [error.message]);
        }
    }
    /**
     * クエリパラメータのエンコード
     */
    encodeQueryParams(params) {
        const searchParams = new URLSearchParams();
        // nullやundefinedの値は除外
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    // 配列の場合はカンマ区切りの文字列として設定
                    searchParams.set(key, value.join(','));
                }
                else if (value instanceof Date) {
                    // 日付型の場合はYYYY-MM-DD形式に変換
                    searchParams.set(key, value.toISOString().split('T')[0]);
                }
                else if (typeof value === 'object') {
                    // オブジェクトの場合は文字列化
                    searchParams.set(key, JSON.stringify(value));
                }
                else {
                    searchParams.set(key, value.toString());
                }
            }
        });
        return searchParams.toString();
    }
}
//# sourceMappingURL=base.js.map