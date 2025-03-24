import { CallToolResult, TextContent, ImageContent, EmbeddedResource } from "@modelcontextprotocol/sdk/types.js";
/**
 * Asserts that a response conforms to the MCP CallToolResult schema
 */
export declare function assertMcpToolResponse(response: unknown): void;
export type MakeContentItem = {
    text: TextContent;
    image: ImageContent;
    resource: EmbeddedResource;
};
/**
 * Creates a valid MCP tool response fixture for testing
 */
export declare function createMcpToolResponseFixture<T extends keyof MakeContentItem>(content: string, type?: T, isError?: boolean): CallToolResult;
//# sourceMappingURL=mcp.d.ts.map