import { z } from "zod";
/**
 * Redmineユーザースキーマ
 * - 管理者権限がない場合は限られたフィールドのみ返される
 * - 自分自身の情報を取得する場合は追加フィールドが返される
 */
export declare const RedmineUserSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    created_on: z.ZodString;
    id: z.ZodOptional<z.ZodNumber>;
    mail: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNumber>;
    last_login_on: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    login: z.ZodOptional<z.ZodString>;
    api_key: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    updated_on: z.ZodOptional<z.ZodString>;
    admin: z.ZodOptional<z.ZodBoolean>;
    passwd_changed_on: z.ZodOptional<z.ZodString>;
    custom_fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        id: number;
    }, {
        value: string;
        name: string;
        id: number;
    }>, "many">>;
    memberships: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
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
        roles: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
        }, {
            name: string;
            id: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        project: {
            name: string;
            id: number;
        };
        roles: {
            name: string;
            id: number;
        }[];
        id?: number | undefined;
    }, {
        project: {
            name: string;
            id: number;
        };
        roles: {
            name: string;
            id: number;
        }[];
        id?: number | undefined;
    }>, "many">>;
    groups: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    created_on: string;
    firstname: string;
    lastname: string;
    status?: number | undefined;
    updated_on?: string | undefined;
    custom_fields?: {
        value: string;
        name: string;
        id: number;
    }[] | undefined;
    id?: number | undefined;
    mail?: string | undefined;
    last_login_on?: string | null | undefined;
    login?: string | undefined;
    api_key?: string | undefined;
    avatar_url?: string | undefined;
    admin?: boolean | undefined;
    passwd_changed_on?: string | undefined;
    memberships?: {
        project: {
            name: string;
            id: number;
        };
        roles: {
            name: string;
            id: number;
        }[];
        id?: number | undefined;
    }[] | undefined;
    groups?: {
        name: string;
        id: number;
    }[] | undefined;
}, {
    created_on: string;
    firstname: string;
    lastname: string;
    status?: number | undefined;
    updated_on?: string | undefined;
    custom_fields?: {
        value: string;
        name: string;
        id: number;
    }[] | undefined;
    id?: number | undefined;
    mail?: string | undefined;
    last_login_on?: string | null | undefined;
    login?: string | undefined;
    api_key?: string | undefined;
    avatar_url?: string | undefined;
    admin?: boolean | undefined;
    passwd_changed_on?: string | undefined;
    memberships?: {
        project: {
            name: string;
            id: number;
        };
        roles: {
            name: string;
            id: number;
        }[];
        id?: number | undefined;
    }[] | undefined;
    groups?: {
        name: string;
        id: number;
    }[] | undefined;
}>;
export declare const UserQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    group_id: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    offset?: number | undefined;
    limit?: number | undefined;
    status?: number | undefined;
    name?: string | undefined;
    group_id?: number | undefined;
}, {
    offset?: number | undefined;
    limit?: number | undefined;
    status?: number | undefined;
    name?: string | undefined;
    group_id?: number | undefined;
}>;
export declare const UserShowParamsSchema: z.ZodObject<{
    include: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    include?: string | undefined;
}, {
    include?: string | undefined;
}>;
export declare function validateUserIncludes(include: string): boolean;
export interface RedmineUserResponse {
    user: z.infer<typeof RedmineUserSchema>;
}
export interface RedmineUsersResponse {
    users: z.infer<typeof RedmineUserSchema>[];
    total_count: number;
    offset?: number;
    limit?: number;
}
//# sourceMappingURL=schema.d.ts.map