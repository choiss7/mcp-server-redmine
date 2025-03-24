import type { RedmineUser, RedmineUserList } from "../lib/types/users/index.js";
/**
 * Format a single user
 * Fields returned depend on user privileges:
 * - For non-admin viewing non-admin: firstname, lastname, mail, created_on
 * - For non-admin viewing admin: firstname, lastname, created_on, last_login_on
 * - For admin: all fields
 * - For self: login, api_key added
 */
export declare function formatUser(user: RedmineUser): string;
/**
 * Format list of users
 */
export declare function formatUsers(response: RedmineUserList): string;
/**
 * Format user create/update result
 */
export declare function formatUserResult(user: RedmineUser, action: "created" | "updated"): string;
/**
 * Format user deletion result
 */
export declare function formatUserDeleted(id: number): string;
//# sourceMappingURL=users.d.ts.map