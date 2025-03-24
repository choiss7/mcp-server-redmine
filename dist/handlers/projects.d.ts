import { HandlerContext, ToolResponse } from "./types.js";
export declare function createProjectsHandlers(context: HandlerContext): {
    list_projects: (args: Record<string, unknown>) => Promise<ToolResponse>;
    show_project: (args: Record<string, unknown>) => Promise<ToolResponse>;
    create_project: (args: Record<string, unknown>) => Promise<ToolResponse>;
    update_project: (args: Record<string, unknown>) => Promise<ToolResponse>;
    archive_project: (args: Record<string, unknown>) => Promise<ToolResponse>;
    unarchive_project: (args: Record<string, unknown>) => Promise<ToolResponse>;
    delete_project: (args: Record<string, unknown>) => Promise<ToolResponse>;
};
//# sourceMappingURL=projects.d.ts.map