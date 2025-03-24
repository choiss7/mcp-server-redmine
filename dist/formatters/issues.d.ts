import type { RedmineApiResponse, RedmineIssue } from "../lib/types/index.js";
/**
 * Format a single issue
 */
export declare function formatIssue(issue: RedmineIssue): string;
/**
 * Format list of issues
 */
export declare function formatIssues(response: RedmineApiResponse<RedmineIssue>): string;
/**
 * Format issue create/update result
 */
export declare function formatIssueResult(issue: RedmineIssue, action: "created" | "updated"): string;
/**
 * Format issue deletion result
 */
export declare function formatIssueDeleted(id: number): string;
//# sourceMappingURL=issues.d.ts.map