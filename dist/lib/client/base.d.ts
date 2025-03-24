/**
 * Redmine API クライアントエラー
 */
export declare class RedmineApiError extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly errors: string[];
    constructor(status: number, statusText: string, errors: string[]);
}
/**
 * Redmine API クライアント
 */
export declare class BaseClient {
    /**
     * Redmine APIにリクエストを送信
     */
    protected performRequest<T>(path: string, options?: RequestInit): Promise<T>;
    /**
     * クエリパラメータのエンコード
     */
    protected encodeQueryParams(params: Record<string, any>): string;
}
//# sourceMappingURL=base.d.ts.map