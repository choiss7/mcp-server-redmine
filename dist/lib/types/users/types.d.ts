export interface RedmineUser {
    id: number;
    firstname: string;
    lastname: string;
    created_on: string;
    login?: string;
    mail?: string;
    last_login_on?: string | null;
    passwd_changed_on?: string;
    api_key?: string;
    status?: number;
    avatar_url?: string;
    updated_on?: string;
    admin?: boolean;
    custom_fields?: Array<{
        id: number;
        name: string;
        value: string;
    }>;
    memberships?: Array<{
        id?: number;
        project: {
            id: number;
            name: string;
        };
        roles: Array<{
            id: number;
            name: string;
        }>;
    }>;
    groups?: Array<{
        id: number;
        name: string;
    }>;
}
export interface RedmineUserList {
    users: RedmineUser[];
    total_count: number;
    offset?: number;
    limit?: number;
}
export interface RedmineUsersResponse {
    users: RedmineUser[];
    total_count: number;
    offset?: number;
    limit?: number;
}
export interface RedmineUserResponse {
    user: RedmineUser;
}
export interface UserListParams {
    status?: number;
    name?: string;
    group_id?: number;
    offset?: number;
    limit?: number;
}
export interface UserShowParams {
    include?: string;
}
export interface RedmineUserCreate {
    login: string;
    password?: string;
    firstname: string;
    lastname: string;
    mail: string;
    auth_source_id?: number;
    mail_notification?: string;
    must_change_passwd?: boolean;
    generate_password?: boolean;
    status?: number;
    custom_fields?: Record<string, unknown>;
    send_information?: boolean;
}
export interface RedmineUserUpdate {
    login?: string;
    firstname?: string;
    lastname?: string;
    mail?: string;
    password?: string;
    auth_source_id?: number;
    mail_notification?: string;
    must_change_passwd?: boolean;
    admin?: boolean;
    status?: number;
    custom_fields?: Record<string, unknown>;
}
//# sourceMappingURL=types.d.ts.map