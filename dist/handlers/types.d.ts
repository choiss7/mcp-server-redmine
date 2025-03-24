import type { RedmineClient } from "../lib/client/index.js";
import type { Config } from "../lib/config.js";
/**
 * Response content type for each tool
 */
export type ToolResponse = {
    content: Array<{
        type: string;
        text: string;
    }>;
    isError: boolean;
};
/**
 * Handler context containing required dependencies
 */
export interface HandlerContext {
    client: RedmineClient;
    config: Config;
}
/**
 * Custom validation error
 */
export declare class ValidationError extends Error {
    constructor(message: string);
}
/**
 * Extract and validate pagination parameters
 * @throws {ValidationError} if parameters are invalid
 */
export declare function extractPaginationParams(args: Record<string, unknown>): PaginationParams;
/**
 * Convert value to number, throw error if invalid
 */
export declare function asNumber(value: unknown): number;
/**
 * Convert value to string and validate as number if needed
 * @param value The value to convert
 * @param allowSpecial Optional array of special string values to allow (e.g., ["current", "me"])
 * @returns The original string if it's a special value, or converts to string if it's a valid number
 */
export declare function asNumberOrSpecial(value: unknown, allowSpecial?: string[]): string;
/**
 * Pagination parameters interface
 */
export interface PaginationParams {
    limit: number;
    offset: number;
}
//# sourceMappingURL=types.d.ts.map