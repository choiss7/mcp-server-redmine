import { BaseClient } from "./base.js";
import { RedmineApiResponse, RedmineIssue, IssueListParams, IssueShowParams, RedmineIssueCreate, RedmineIssueUpdate } from "../types/index.js";
export declare class IssuesClient extends BaseClient {
    /**
     * List issues with pagination and filters
     *
     * @param params Optional parameters for filtering and pagination
     * @returns Promise with paginated issue list
     * @throws Error if include parameter is invalid
     */
    getIssues(params?: IssueListParams): Promise<RedmineApiResponse<RedmineIssue>>;
    /**
     * Get a single issue by ID
     *
     * @param id Issue ID
     * @param params Optional parameters for including related data
     * @returns Promise with single issue
     * @throws Error if include parameter is invalid
     */
    getIssue(id: number, params?: IssueShowParams): Promise<{
        issue: RedmineIssue;
    }>;
    /**
     * Create a new issue
     *
     * @param issue Issue creation parameters
     * @returns Promise with created issue
     */
    createIssue(issue: RedmineIssueCreate): Promise<{
        issue: RedmineIssue;
    }>;
    /**
     * Update an existing issue
     *
     * @param id Issue ID to update
     * @param issue Update parameters
     * @returns Promise with updated issue
     */
    updateIssue(id: number, issue: RedmineIssueUpdate): Promise<{
        issue: RedmineIssue;
    }>;
    /**
     * Delete an issue
     *
     * @param id Issue ID to delete
     * @returns Promise that resolves when the issue is deleted
     */
    deleteIssue(id: number): Promise<void>;
    /**
     * Add a user as a watcher to an issue
     * Available since Redmine 2.3.0
     *
     * @param issueId Issue ID to add watcher to
     * @param userId User ID to add as watcher
     * @returns Promise that resolves when the watcher is added
     */
    addWatcher(issueId: number, userId: number): Promise<void>;
    /**
     * Remove a user from issue watchers
     * Available since Redmine 2.3.0
     *
     * @param issueId Issue ID to remove watcher from
     * @param userId User ID to remove from watchers
     * @returns Promise that resolves when the watcher is removed
     */
    removeWatcher(issueId: number, userId: number): Promise<void>;
}
//# sourceMappingURL=issues.d.ts.map