import type { RedmineApiResponse, RedmineTimeEntry } from "../lib/types/index.js";
/**
 * Format a single time entry
 */
export declare function formatTimeEntry(entry: RedmineTimeEntry): string;
/**
 * Format list of time entries
 */
export declare function formatTimeEntries(response: RedmineApiResponse<RedmineTimeEntry>): string;
/**
 * Format time entry create/update result
 */
export declare function formatTimeEntryResult(entry: RedmineTimeEntry, action: "created" | "updated"): string;
/**
 * Format time entry deletion result
 */
export declare function formatTimeEntryDeleted(id: number): string;
//# sourceMappingURL=time_entries.d.ts.map