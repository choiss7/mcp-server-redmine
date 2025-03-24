import { HandlerContext, ToolResponse } from "./types.js";
/**
 * Creates handlers for issue-related operations
 * @param context Handler context containing the Redmine client and config
 * @returns Object containing all issue-related handlers
 */
export declare function createIssuesHandlers(context: HandlerContext): {
    /**
     * Lists issues with pagination and filters
     */
    list_issues: (args: unknown) => Promise<ToolResponse>;
};
//# sourceMappingURL=issues.d.ts.map