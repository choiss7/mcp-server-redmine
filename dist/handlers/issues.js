import { asNumber, extractPaginationParams, ValidationError, } from "./types.js";
import * as formatters from "../formatters/index.js";
/**
 * Creates handlers for issue-related operations
 * @param context Handler context containing the Redmine client and config
 * @returns Object containing all issue-related handlers
 */
export function createIssuesHandlers(context) {
    const { client } = context;
    return {
        /**
         * Lists issues with pagination and filters
         */
        list_issues: async (args) => {
            try {
                // Validate input structure
                if (typeof args !== 'object' || args === null) {
                    throw new ValidationError("Arguments must be an object");
                }
                // Extract and validate pagination parameters
                const argsObj = args;
                const { limit, offset } = extractPaginationParams(argsObj);
                // Construct parameters with type conversion
                const params = {
                    limit,
                    offset,
                };
                // Add optional parameters with validation
                if ('sort' in argsObj)
                    params.sort = String(argsObj.sort);
                if ('include' in argsObj)
                    params.include = String(argsObj.include);
                if ('project_id' in argsObj)
                    params.project_id = asNumber(argsObj.project_id);
                if ('issue_id' in argsObj)
                    params.issue_id = asNumber(argsObj.issue_id);
                if ('subproject_id' in argsObj)
                    params.subproject_id = String(argsObj.subproject_id);
                if ('tracker_id' in argsObj)
                    params.tracker_id = asNumber(argsObj.tracker_id);
                // Handle status_id special values
                if ('status_id' in argsObj) {
                    const statusId = String(argsObj.status_id);
                    if (!["open", "closed", "*"].includes(statusId)) {
                        params.status_id = asNumber(argsObj.status_id);
                    }
                    else {
                        params.status_id = statusId;
                    }
                }
                // Handle assigned_to_id special value
                if ('assigned_to_id' in argsObj) {
                    if (argsObj.assigned_to_id === "me") {
                        params.assigned_to_id = "me";
                    }
                    else {
                        params.assigned_to_id = asNumber(argsObj.assigned_to_id);
                    }
                }
                // Handle date filters
                if ('created_on' in argsObj)
                    params.created_on = String(argsObj.created_on);
                if ('updated_on' in argsObj)
                    params.updated_on = String(argsObj.updated_on);
                // Handle custom fields (cf_X parameters)
                for (const [key, value] of Object.entries(argsObj)) {
                    if (key.startsWith("cf_")) {
                        params[key] = String(value);
                    }
                }
                const issues = await client.issues.getIssues(params);
                return {
                    content: [
                        {
                            type: "text",
                            text: formatters.formatIssues(issues),
                        }
                    ],
                    isError: false,
                };
            }
            catch (error) {
                // Handle validation errors specifically
                const isValidationError = error instanceof ValidationError;
                return {
                    content: [
                        {
                            type: "text",
                            text: error instanceof Error ? error.message : String(error),
                        }
                    ],
                    isError: true,
                };
            }
        },
        // ... rest of the handlers unchanged ...
    };
}
//# sourceMappingURL=issues.js.map