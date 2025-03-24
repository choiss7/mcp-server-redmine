import { z } from "zod";
export declare function validateListIssueIncludes(include: string): boolean;
export declare function validateShowIssueIncludes(include: string): boolean;
export declare const IssueQuerySchema: z.ZodObject<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    include: z.ZodOptional<z.ZodEffects<z.ZodString, string[], string>>;
    issue_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    subproject_id: z.ZodOptional<z.ZodString>;
    tracker_id: z.ZodOptional<z.ZodNumber>;
    status_id: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"open">, z.ZodLiteral<"closed">, z.ZodLiteral<"*">, z.ZodNumber]>>;
    assigned_to_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"me">]>>;
    parent_id: z.ZodOptional<z.ZodNumber>;
    created_on: z.ZodOptional<z.ZodString>;
    updated_on: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.objectOutputType<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    include: z.ZodOptional<z.ZodEffects<z.ZodString, string[], string>>;
    issue_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    subproject_id: z.ZodOptional<z.ZodString>;
    tracker_id: z.ZodOptional<z.ZodNumber>;
    status_id: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"open">, z.ZodLiteral<"closed">, z.ZodLiteral<"*">, z.ZodNumber]>>;
    assigned_to_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"me">]>>;
    parent_id: z.ZodOptional<z.ZodNumber>;
    created_on: z.ZodOptional<z.ZodString>;
    updated_on: z.ZodOptional<z.ZodString>;
}, z.ZodUnion<[z.ZodString, z.ZodNumber]>, "strip">, z.objectInputType<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    include: z.ZodOptional<z.ZodEffects<z.ZodString, string[], string>>;
    issue_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    subproject_id: z.ZodOptional<z.ZodString>;
    tracker_id: z.ZodOptional<z.ZodNumber>;
    status_id: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"open">, z.ZodLiteral<"closed">, z.ZodLiteral<"*">, z.ZodNumber]>>;
    assigned_to_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"me">]>>;
    parent_id: z.ZodOptional<z.ZodNumber>;
    created_on: z.ZodOptional<z.ZodString>;
    updated_on: z.ZodOptional<z.ZodString>;
}, z.ZodUnion<[z.ZodString, z.ZodNumber]>, "strip">>;
export declare const RedmineIssueSchema: z.ZodObject<{
    id: z.ZodNumber;
    project: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>;
    tracker: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>;
    status: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        is_closed: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        is_closed?: boolean | undefined;
    }, {
        name: string;
        id: number;
        is_closed?: boolean | undefined;
    }>;
    priority: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>;
    author: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>;
    assigned_to: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
    subject: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    start_date: z.ZodOptional<z.ZodString>;
    due_date: z.ZodNullable<z.ZodString>;
    done_ratio: z.ZodNumber;
    estimated_hours: z.ZodNullable<z.ZodNumber>;
    spent_hours: z.ZodOptional<z.ZodNumber>;
    total_estimated_hours: z.ZodNullable<z.ZodNumber>;
    total_spent_hours: z.ZodOptional<z.ZodNumber>;
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
    created_on: z.ZodString;
    updated_on: z.ZodString;
    closed_on: z.ZodNullable<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    private_notes: z.ZodOptional<z.ZodBoolean>;
    is_private: z.ZodOptional<z.ZodBoolean>;
    watcher_user_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    relations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        issue_id: z.ZodNumber;
        issue_to_id: z.ZodNumber;
        relation_type: z.ZodString;
        delay: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        issue_id: number;
        id: number;
        issue_to_id: number;
        relation_type: string;
        delay: number | null;
    }, {
        issue_id: number;
        id: number;
        issue_to_id: number;
        relation_type: string;
        delay: number | null;
    }>, "many">>;
    parent: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: {
        name: string;
        id: number;
        is_closed?: boolean | undefined;
    };
    created_on: string;
    updated_on: string;
    subject: string;
    estimated_hours: number | null;
    due_date: string | null;
    id: number;
    project: {
        name: string;
        id: number;
    };
    tracker: {
        name: string;
        id: number;
    };
    priority: {
        name: string;
        id: number;
    };
    author: {
        name: string;
        id: number;
    };
    done_ratio: number;
    total_estimated_hours: number | null;
    closed_on: string | null;
    relations?: {
        issue_id: number;
        id: number;
        issue_to_id: number;
        relation_type: string;
        delay: number | null;
    }[] | undefined;
    description?: string | undefined;
    custom_fields?: {
        value: string | string[];
        name: string;
        id: number;
    }[] | undefined;
    watcher_user_ids?: number[] | undefined;
    is_private?: boolean | undefined;
    start_date?: string | undefined;
    notes?: string | undefined;
    private_notes?: boolean | undefined;
    assigned_to?: {
        name: string;
        id: number;
    } | undefined;
    spent_hours?: number | undefined;
    total_spent_hours?: number | undefined;
    parent?: {
        id: number;
    } | undefined;
}, {
    status: {
        name: string;
        id: number;
        is_closed?: boolean | undefined;
    };
    created_on: string;
    updated_on: string;
    subject: string;
    estimated_hours: number | null;
    due_date: string | null;
    id: number;
    project: {
        name: string;
        id: number;
    };
    tracker: {
        name: string;
        id: number;
    };
    priority: {
        name: string;
        id: number;
    };
    author: {
        name: string;
        id: number;
    };
    done_ratio: number;
    total_estimated_hours: number | null;
    closed_on: string | null;
    relations?: {
        issue_id: number;
        id: number;
        issue_to_id: number;
        relation_type: string;
        delay: number | null;
    }[] | undefined;
    description?: string | undefined;
    custom_fields?: {
        value: string | string[];
        name: string;
        id: number;
    }[] | undefined;
    watcher_user_ids?: number[] | undefined;
    is_private?: boolean | undefined;
    start_date?: string | undefined;
    notes?: string | undefined;
    private_notes?: boolean | undefined;
    assigned_to?: {
        name: string;
        id: number;
    } | undefined;
    spent_hours?: number | undefined;
    total_spent_hours?: number | undefined;
    parent?: {
        id: number;
    } | undefined;
}>;
//# sourceMappingURL=schema.d.ts.map