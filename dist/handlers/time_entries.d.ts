import { HandlerContext, ToolResponse } from "./types.js";
export declare function createTimeEntriesHandlers(context: HandlerContext): {
    list_time_entries: (args: Record<string, unknown>) => Promise<ToolResponse>;
    show_time_entry: (args: Record<string, unknown>) => Promise<ToolResponse>;
    create_time_entry: (args: Record<string, unknown>) => Promise<ToolResponse>;
    update_time_entry: (args: Record<string, unknown>) => Promise<ToolResponse>;
    delete_time_entry: (args: Record<string, unknown>) => Promise<ToolResponse>;
};
//# sourceMappingURL=time_entries.d.ts.map