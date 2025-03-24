import { z } from "zod";
export declare const ProjectQuerySchema: z.ZodObject<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<5>, z.ZodLiteral<9>]>>;
    is_public: z.ZodOptional<z.ZodBoolean>;
    include: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    offset?: number | undefined;
    limit?: number | undefined;
    status?: 1 | 5 | 9 | undefined;
    name?: string | undefined;
    include?: string | undefined;
    is_public?: boolean | undefined;
}, {
    offset?: number | undefined;
    limit?: number | undefined;
    status?: 1 | 5 | 9 | undefined;
    name?: string | undefined;
    include?: string | undefined;
    is_public?: boolean | undefined;
}>;
export declare const RedmineProjectSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    identifier: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    homepage: z.ZodOptional<z.ZodString>;
    status: z.ZodNumber;
    parent: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
    created_on: z.ZodString;
    updated_on: z.ZodString;
    is_public: z.ZodBoolean;
    inherit_members: z.ZodOptional<z.ZodBoolean>;
    enabled_module_names: z.ZodOptional<z.ZodArray<z.ZodEnum<["boards", "calendar", "documents", "files", "gantt", "issue_tracking", "news", "repository", "time_tracking", "wiki"]>, "many">>;
    trackers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>, "many">>;
    issue_categories: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>, "many">>;
    time_entry_activities: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        is_default: z.ZodOptional<z.ZodBoolean>;
        active: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        is_default?: boolean | undefined;
        active?: boolean | undefined;
    }, {
        name: string;
        id: number;
        is_default?: boolean | undefined;
        active?: boolean | undefined;
    }>, "many">>;
    custom_fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        value: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        value: string | string[];
        name: string;
        id: number;
    }, {
        value: string | string[];
        name: string;
        id: number;
    }>, "many">>;
    default_version: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
    default_assignee: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: number;
    name: string;
    created_on: string;
    updated_on: string;
    id: number;
    is_public: boolean;
    identifier: string;
    description?: string | undefined;
    custom_fields?: {
        value: string | string[];
        name: string;
        id: number;
    }[] | undefined;
    parent?: {
        name: string;
        id: number;
    } | undefined;
    trackers?: {
        name: string;
        id: number;
    }[] | undefined;
    issue_categories?: {
        name: string;
        id: number;
    }[] | undefined;
    time_entry_activities?: {
        name: string;
        id: number;
        is_default?: boolean | undefined;
        active?: boolean | undefined;
    }[] | undefined;
    homepage?: string | undefined;
    inherit_members?: boolean | undefined;
    enabled_module_names?: ("boards" | "calendar" | "documents" | "files" | "gantt" | "issue_tracking" | "news" | "repository" | "time_tracking" | "wiki")[] | undefined;
    default_version?: {
        name: string;
        id: number;
    } | undefined;
    default_assignee?: {
        name: string;
        id: number;
    } | undefined;
}, {
    status: number;
    name: string;
    created_on: string;
    updated_on: string;
    id: number;
    is_public: boolean;
    identifier: string;
    description?: string | undefined;
    custom_fields?: {
        value: string | string[];
        name: string;
        id: number;
    }[] | undefined;
    parent?: {
        name: string;
        id: number;
    } | undefined;
    trackers?: {
        name: string;
        id: number;
    }[] | undefined;
    issue_categories?: {
        name: string;
        id: number;
    }[] | undefined;
    time_entry_activities?: {
        name: string;
        id: number;
        is_default?: boolean | undefined;
        active?: boolean | undefined;
    }[] | undefined;
    homepage?: string | undefined;
    inherit_members?: boolean | undefined;
    enabled_module_names?: ("boards" | "calendar" | "documents" | "files" | "gantt" | "issue_tracking" | "news" | "repository" | "time_tracking" | "wiki")[] | undefined;
    default_version?: {
        name: string;
        id: number;
    } | undefined;
    default_assignee?: {
        name: string;
        id: number;
    } | undefined;
}>;
export type ProjectQueryParams = z.infer<typeof ProjectQuerySchema>;
export type ModuleNames = z.infer<typeof RedmineProjectSchema>["enabled_module_names"];
//# sourceMappingURL=schema.d.ts.map