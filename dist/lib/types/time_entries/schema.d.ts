import { z } from "zod";
export declare const TimeEntryQuerySchema: z.ZodObject<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    user_id: z.ZodOptional<z.ZodNumber>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    spent_on: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    offset?: number | undefined;
    limit?: number | undefined;
    project_id?: string | number | undefined;
    user_id?: number | undefined;
    spent_on?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    offset?: number | undefined;
    limit?: number | undefined;
    project_id?: string | number | undefined;
    user_id?: number | undefined;
    spent_on?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const RedmineTimeEntrySchema: z.ZodObject<{
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
    issue: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>>;
    user: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>;
    activity: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>;
    hours: z.ZodNumber;
    comments: z.ZodOptional<z.ZodString>;
    spent_on: z.ZodString;
    created_on: z.ZodString;
    updated_on: z.ZodString;
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
}, "strip", z.ZodTypeAny, {
    created_on: string;
    updated_on: string;
    id: number;
    project: {
        name: string;
        id: number;
    };
    spent_on: string;
    user: {
        name: string;
        id: number;
    };
    activity: {
        name: string;
        id: number;
    };
    hours: number;
    custom_fields?: {
        value: string | string[];
        name: string;
        id: number;
    }[] | undefined;
    issue?: {
        id: number;
    } | undefined;
    comments?: string | undefined;
}, {
    created_on: string;
    updated_on: string;
    id: number;
    project: {
        name: string;
        id: number;
    };
    spent_on: string;
    user: {
        name: string;
        id: number;
    };
    activity: {
        name: string;
        id: number;
    };
    hours: number;
    custom_fields?: {
        value: string | string[];
        name: string;
        id: number;
    }[] | undefined;
    issue?: {
        id: number;
    } | undefined;
    comments?: string | undefined;
}>;
export type TimeEntryQueryParams = z.infer<typeof TimeEntryQuerySchema>;
//# sourceMappingURL=schema.d.ts.map