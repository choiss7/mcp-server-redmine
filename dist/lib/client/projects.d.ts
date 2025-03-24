import { BaseClient } from "./base.js";
import { RedmineApiResponse, RedmineProject, RedmineProjectCreate } from "../types/index.js";
import { ProjectQueryParams } from "../types/projects/schema.js";
export declare class ProjectsClient extends BaseClient {
    getProjects(params?: ProjectQueryParams): Promise<RedmineApiResponse<RedmineProject>>;
    getProject(idOrIdentifier: number | string, params?: Pick<ProjectQueryParams, "include">): Promise<{
        project: RedmineProject;
    }>;
    createProject(project: RedmineProjectCreate): Promise<{
        project: RedmineProject;
    }>;
    updateProject(idOrIdentifier: number | string, project: Partial<RedmineProjectCreate>): Promise<{
        project: RedmineProject;
    }>;
    archiveProject(idOrIdentifier: number | string): Promise<void>;
    unarchiveProject(idOrIdentifier: number | string): Promise<void>;
    deleteProject(idOrIdentifier: number | string): Promise<void>;
}
//# sourceMappingURL=projects.d.ts.map