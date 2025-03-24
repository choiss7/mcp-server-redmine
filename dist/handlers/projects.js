import { ValidationError, asNumberOrSpecial } from "./types.js";
import { PROJECT_STATUS } from "../lib/types/projects/types.js";
import * as formatters from "../formatters/index.js";
// Valid include values for projects
const VALID_INCLUDE_VALUES = [
    "trackers",
    "issue_categories",
    "enabled_modules",
    "time_entry_activities",
    "issue_custom_fields",
];
/**
 * Type guard for RedmineProjectCreate
 * Validates required fields for project creation
 */
function isRedmineProjectCreate(value) {
    if (typeof value !== "object" || !value)
        return false;
    const v = value;
    return typeof v.name === "string" && typeof v.identifier === "string";
}
/**
 * Validates include parameter values
 * @param include The include string to validate
 * @returns true if valid, false otherwise
 */
function validateIncludeValues(include) {
    const values = include.split(",").map(v => v.trim());
    return values.every(v => VALID_INCLUDE_VALUES.includes(v));
}
/**
 * Extract and validate project search parameters
 * @param args Raw input parameters
 * @returns Validated ProjectSearchParams
 */
function extractSearchParams(args) {
    const params = {
        // Set default limit
        limit: typeof args.limit === "number"
            ? Math.min(Math.max(1, args.limit), 100)
            : 10,
    };
    // Set offset if provided
    if (typeof args.offset === "number") {
        params.offset = args.offset;
    }
    // Validate and set status parameter
    if (typeof args.status === "number" &&
        PROJECT_STATUS.includes(args.status)) {
        params.status = args.status;
    }
    // Validate and set include parameter
    if (typeof args.include === "string" && args.include.length > 0) {
        if (!validateIncludeValues(args.include)) {
            throw new ValidationError("Invalid include value. Must be comma-separated list of: " +
                VALID_INCLUDE_VALUES.join(", "));
        }
        params.include = args.include;
    }
    return params;
}
export function createProjectsHandlers(context) {
    const { client } = context;
    return {
        list_projects: async (args) => {
            try {
                const searchParams = extractSearchParams(args);
                const projects = await client.projects.getProjects(searchParams);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProjects(projects),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        show_project: async (args) => {
            try {
                const id = asNumberOrSpecial(args.id);
                const { project } = await client.projects.getProject(id);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProject(project),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        create_project: async (args) => {
            try {
                if (!isRedmineProjectCreate(args)) {
                    throw new ValidationError("Invalid project create parameters");
                }
                const { project } = await client.projects.createProject(args);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProjectResult(project, "created"),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        update_project: async (args) => {
            try {
                const id = asNumberOrSpecial(args.id);
                const { id: _, ...updateData } = args;
                const { project } = await client.projects.updateProject(id, updateData);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProjectResult(project, "updated"),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        archive_project: async (args) => {
            try {
                const id = asNumberOrSpecial(args.id);
                await client.projects.archiveProject(id);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProjectArchiveStatus(id, true),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        unarchive_project: async (args) => {
            try {
                const id = asNumberOrSpecial(args.id);
                await client.projects.unarchiveProject(id);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProjectArchiveStatus(id, false),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        delete_project: async (args) => {
            try {
                const id = asNumberOrSpecial(args.id);
                await client.projects.deleteProject(id);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatProjectDeleted(id),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
    };
}
//# sourceMappingURL=projects.js.map