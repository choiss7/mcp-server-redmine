import { BaseClient, RedmineApiError } from "./base.js";
import { ProjectQuerySchema, RedmineProjectSchema, } from "../types/projects/schema.js";
import { ZodError } from "zod";
export class ProjectsClient extends BaseClient {
    async getProjects(params) {
        try {
            const validatedParams = params ? ProjectQuerySchema.parse(params) : undefined;
            const encodedParams = validatedParams ? {
                ...validatedParams,
                // Convert boolean to 0/1
                ...(validatedParams.is_public !== undefined && {
                    is_public: validatedParams.is_public ? "1" : "0"
                }),
                // include is already a string, no need for conversion
            } : undefined;
            const query = encodedParams ? this.encodeQueryParams(encodedParams) : "";
            const response = await this.performRequest(`projects.json${query ? `?${query}` : ""}`);
            return response;
        }
        catch (error) {
            if (error instanceof ZodError) {
                throw new RedmineApiError(422, "Validation failed", [error.message]);
            }
            throw error;
        }
    }
    async getProject(idOrIdentifier, params) {
        try {
            const validatedParams = params ? ProjectQuerySchema.pick({
                include: true
            }).parse(params) : undefined;
            const query = validatedParams ? this.encodeQueryParams(validatedParams) : "";
            const response = await this.performRequest(`projects/${idOrIdentifier}.json${query ? `?${query}` : ""}`);
            return {
                project: RedmineProjectSchema.parse(response.project),
            };
        }
        catch (error) {
            if (error instanceof ZodError) {
                throw new RedmineApiError(422, "Validation failed", [error.message]);
            }
            throw error;
        }
    }
    async createProject(project) {
        const response = await this.performRequest("projects.json", {
            method: "POST",
            body: JSON.stringify({ project }),
        });
        return {
            project: RedmineProjectSchema.parse(response.project),
        };
    }
    async updateProject(idOrIdentifier, project) {
        const response = await this.performRequest(`projects/${idOrIdentifier}.json`, {
            method: "PUT",
            body: JSON.stringify({ project }),
        });
        return {
            project: RedmineProjectSchema.parse(response.project),
        };
    }
    async archiveProject(idOrIdentifier) {
        await this.performRequest(`projects/${idOrIdentifier}/archive.json`, {
            method: "PUT",
        });
    }
    async unarchiveProject(idOrIdentifier) {
        await this.performRequest(`projects/${idOrIdentifier}/unarchive.json`, {
            method: "PUT",
        });
    }
    async deleteProject(idOrIdentifier) {
        await this.performRequest(`projects/${idOrIdentifier}.json`, {
            method: "DELETE",
        });
    }
}
//# sourceMappingURL=projects.js.map