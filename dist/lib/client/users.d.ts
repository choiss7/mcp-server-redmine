import { BaseClient } from "./base.js";
import { UserListParams, UserShowParams, RedmineUserResponse, RedmineUsersResponse, RedmineUserCreate, RedmineUserUpdate } from "../types/index.js";
export declare class UsersClient extends BaseClient {
    /**
     * Get list of users
     * Requires admin privileges
     */
    getUsers(params?: UserListParams): Promise<RedmineUsersResponse>;
    /**
     * Get user details
     * Returns different information based on access rights
     */
    getUser(id: number | "current", params?: UserShowParams): Promise<RedmineUserResponse>;
    /**
     * Get current user information (shortcut method)
     */
    getCurrentUser(params?: UserShowParams): Promise<RedmineUserResponse>;
    /**
     * Create a new user
     * Requires admin privileges
     * Returns:
     * - 201 Created: User creation successful
     * - 422 Unprocessable Entity: Validation error
     */
    createUser(data: RedmineUserCreate): Promise<RedmineUserResponse>;
    /**
     * Update user information
     * Requires admin privileges
     * Returns:
     * - 200 OK: Update successful
     * - 422 Unprocessable Entity: Validation error
     */
    updateUser(id: number, data: RedmineUserUpdate): Promise<RedmineUserResponse>;
    /**
     * Delete a user
     * Requires admin privileges
     * Returns:
     * - 204 No Content: Deletion successful
     */
    deleteUser(id: number): Promise<void>;
}
//# sourceMappingURL=users.d.ts.map