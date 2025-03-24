import { type Tool, TextContentSchema, ImageContentSchema, EmbeddedResourceSchema } from "@modelcontextprotocol/sdk/types.js";
export interface RedmineUpload {
    token: string;
    filename: string;
    content_type: string;
    description?: string;
}
export interface RedmineApiResponse<T> {
    offset?: number;
    limit?: number;
    total_count?: number;
    [key: string]: T | T[] | number | undefined;
}
export interface RedmineErrorResponse {
    errors: string[];
}
export { Tool, TextContentSchema, ImageContentSchema, EmbeddedResourceSchema, };
//# sourceMappingURL=common.d.ts.map