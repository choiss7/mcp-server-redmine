import { HandlerContext, ToolResponse } from "./types.js";
export declare function createUsersHandlers(context: HandlerContext): {
    list_users: (args: Record<string, unknown>) => Promise<ToolResponse>;
    show_user: (args: Record<string, unknown>) => Promise<ToolResponse>;
    create_user: (args: Record<string, unknown>) => Promise<ToolResponse>;
    update_user: (args: Record<string, unknown>) => Promise<ToolResponse>;
    delete_user: (args: Record<string, unknown>) => Promise<ToolResponse>;
};
//# sourceMappingURL=users.d.ts.map