import { BaseClient } from "./base.js";
import { RedmineApiResponse, RedmineTimeEntry, RedmineTimeEntryCreate, RedmineTimeEntryUpdate } from "../types/index.js";
import { TimeEntryQueryParams } from "../types/time_entries/schema.js";
export declare class TimeEntriesClient extends BaseClient {
    getTimeEntries(params?: TimeEntryQueryParams): Promise<RedmineApiResponse<RedmineTimeEntry>>;
    getTimeEntry(id: number): Promise<{
        time_entry: RedmineTimeEntry;
    }>;
    createTimeEntry(timeEntry: RedmineTimeEntryCreate): Promise<{
        time_entry: RedmineTimeEntry;
    }>;
    updateTimeEntry(id: number, timeEntry: RedmineTimeEntryUpdate): Promise<{
        time_entry: RedmineTimeEntry;
    }>;
    deleteTimeEntry(id: number): Promise<void>;
}
//# sourceMappingURL=time_entries.d.ts.map