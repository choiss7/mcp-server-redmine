import { IssuesClient } from "./issues.js";
import { ProjectsClient } from "./projects.js";
import { TimeEntriesClient } from "./time_entries.js";
import { UsersClient } from "./users.js";
import { RedmineApiError } from "./base.js";
/**
 * Redmine API クライアント
 */
export class RedmineClient {
    constructor() {
        this.issues = new IssuesClient();
        this.projects = new ProjectsClient();
        this.timeEntries = new TimeEntriesClient();
        this.users = new UsersClient();
    }
}
// クライアントのシングルトンインスタンス
export const redmineClient = new RedmineClient();
export { RedmineApiError };
//# sourceMappingURL=index.js.map