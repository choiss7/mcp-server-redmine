import { BaseClient } from "./base.js";
import { TimeEntryQuerySchema, RedmineTimeEntrySchema, } from "../types/time_entries/schema.js";
export class TimeEntriesClient extends BaseClient {
    async getTimeEntries(params) {
        const validatedParams = params ? TimeEntryQuerySchema.parse(params) : undefined;
        const query = validatedParams ? this.encodeQueryParams(validatedParams) : "";
        const response = await this.performRequest(`time_entries.json${query ? `?${query}` : ""}`);
        return response;
    }
    async getTimeEntry(id) {
        const response = await this.performRequest(`time_entries/${id}.json`);
        return {
            time_entry: RedmineTimeEntrySchema.parse(response.time_entry),
        };
    }
    async createTimeEntry(timeEntry) {
        const response = await this.performRequest("time_entries.json", {
            method: "POST",
            body: JSON.stringify({ time_entry: timeEntry }),
        });
        return {
            time_entry: RedmineTimeEntrySchema.parse(response.time_entry),
        };
    }
    async updateTimeEntry(id, timeEntry) {
        const response = await this.performRequest(`time_entries/${id}.json`, {
            method: "PUT",
            body: JSON.stringify({ time_entry: timeEntry }),
        });
        return {
            time_entry: RedmineTimeEntrySchema.parse(response.time_entry),
        };
    }
    async deleteTimeEntry(id) {
        await this.performRequest(`time_entries/${id}.json`, {
            method: "DELETE",
        });
    }
}
//# sourceMappingURL=time_entries.js.map