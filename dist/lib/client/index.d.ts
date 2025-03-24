import { IssuesClient } from "./issues.js";
import { ProjectsClient } from "./projects.js";
import { TimeEntriesClient } from "./time_entries.js";
import { UsersClient } from "./users.js";
import { RedmineApiError } from "./base.js";
/**
 * Redmine API クライアント
 */
export declare class RedmineClient {
    readonly issues: IssuesClient;
    readonly projects: ProjectsClient;
    readonly timeEntries: TimeEntriesClient;
    readonly users: UsersClient;
    constructor();
}
export declare const redmineClient: RedmineClient;
export { RedmineApiError };
//# sourceMappingURL=index.d.ts.map