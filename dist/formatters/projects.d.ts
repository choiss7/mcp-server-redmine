import type { RedmineApiResponse, RedmineProject } from "../lib/types/index.js";
/**
 * Format a single project
 */
export declare function formatProject(project: RedmineProject): string;
/**
 * Format list of projects
 */
export declare function formatProjects(response: RedmineApiResponse<RedmineProject>): string;
/**
 * Format project create/update result
 */
export declare function formatProjectResult(project: RedmineProject, action: "created" | "updated"): string;
/**
 * Format project deletion result
 */
export declare function formatProjectDeleted(id: string | number): string;
/**
 * Format project archive status change result
 */
export declare function formatProjectArchiveStatus(id: string | number, archived: boolean): string;
//# sourceMappingURL=projects.d.ts.map