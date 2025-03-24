import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { IssuesClient } from "../../../client/issues.js";
import { mockResponse, mockErrorResponse } from "../../helpers/mocks.js";
import * as fixtures from "../../helpers/fixtures.js";
import config from "../../../config.js";
import { RedmineApiError } from "../../../client/base.js";
import { parseUrl } from "../../helpers/url.js";
// Default pagination parameters
const DEFAULT_PAGINATION = {
    offset: "0",
    limit: "25"
};
describe("Issues API (GET)", () => {
    let client;
    let mockFetch;
    beforeEach(() => {
        client = new IssuesClient();
        mockFetch = jest.spyOn(global, "fetch");
        mockFetch.mockReset();
    });
    describe("GET /issues.json (getIssues)", () => {
        it("fetches issues without parameters", async () => {
            // Arrange
            mockFetch.mockImplementationOnce(async () => mockResponse(fixtures.issueListResponse));
            // Act
            const result = await client.getIssues();
            // Assert
            const expectedUrl = new URL("/issues.json", config.redmine.host);
            const [actualUrl, options] = mockFetch.mock.calls[0];
            const { params } = parseUrl(actualUrl);
            expect(params).toEqual(DEFAULT_PAGINATION);
            expect(options).toMatchObject({
                method: "GET",
                headers: expect.objectContaining({
                    Accept: "application/json",
                    "X-Redmine-API-Key": config.redmine.apiKey,
                }),
            });
            expect(result).toEqual(fixtures.issueListResponse);
        });
        describe("filtering", () => {
            it("filters by project and status", async () => {
                // Arrange
                const params = {
                    project_id: 1,
                    status_id: "open",
                    sort: "updated_on:desc"
                };
                mockFetch.mockImplementationOnce(async () => mockResponse(fixtures.issueListResponse));
                // Act
                const result = await client.getIssues(params);
                // Assert
                const [url] = mockFetch.mock.calls[0];
                const { params: actualParams } = parseUrl(url);
                expect(actualParams).toEqual({
                    ...DEFAULT_PAGINATION,
                    project_id: "1",
                    status_id: "open",
                    sort: "updated_on:desc"
                });
            });
            it("filters by assigned user", async () => {
                // Arrange
                const params = {
                    assigned_to_id: "me",
                    status_id: "*" // all statuses
                };
                mockFetch.mockImplementationOnce(async () => mockResponse(fixtures.issueListResponse));
                // Act
                const result = await client.getIssues(params);
                // Assert
                const [url] = mockFetch.mock.calls[0];
                const { params: actualParams } = parseUrl(url);
                expect(actualParams).toEqual({
                    ...DEFAULT_PAGINATION,
                    assigned_to_id: "me",
                    status_id: "*"
                });
            });
            it("filters by custom field", async () => {
                // Arrange
                const params = {
                    cf_1: "custom_value",
                    project_id: 1
                };
                mockFetch.mockImplementationOnce(async () => mockResponse(fixtures.issueListResponse));
                // Act
                const result = await client.getIssues(params);
                // Assert
                const [url] = mockFetch.mock.calls[0];
                const { params: actualParams } = parseUrl(url);
                expect(actualParams).toEqual({
                    ...DEFAULT_PAGINATION,
                    cf_1: "custom_value",
                    project_id: "1"
                });
            });
            it("applies pagination with custom values", async () => {
                // Arrange
                const params = {
                    offset: 25,
                    limit: 50
                };
                mockFetch.mockImplementationOnce(async () => mockResponse(fixtures.issueListResponse));
                // Act
                const result = await client.getIssues(params);
                // Assert
                const [url] = mockFetch.mock.calls[0];
                const { params: actualParams } = parseUrl(url);
                expect(actualParams).toEqual({
                    offset: "25",
                    limit: "50"
                });
            });
        });
        it("handles error", async () => {
            // Arrange
            mockFetch.mockImplementationOnce(async () => mockErrorResponse(400, ["Invalid query parameters"]));
            // Act & Assert
            await expect(client.getIssues({ invalid_param: "value" }))
                .rejects.toThrow(RedmineApiError);
        });
    });
    describe("GET /issues/:id.json (getIssue)", () => {
        const issueId = fixtures.singleIssueResponse.issue.id;
        it("fetches a single issue", async () => {
            // Arrange
            mockFetch.mockImplementationOnce(async () => mockResponse(fixtures.singleIssueResponse));
            // Act
            const result = await client.getIssue(issueId);
            // Assert
            const expectedUrl = new URL(`/issues/${issueId}.json`, config.redmine.host);
            expect(mockFetch).toHaveBeenCalledWith(expectedUrl.toString(), expect.objectContaining({
                method: "GET",
                headers: expect.objectContaining({
                    Accept: "application/json",
                    "X-Redmine-API-Key": config.redmine.apiKey,
                }),
            }));
            expect(result).toEqual(fixtures.singleIssueResponse);
        });
        it("handles error", async () => {
            // Arrange
            mockFetch.mockImplementationOnce(async () => mockErrorResponse(404, ["Issue not found"]));
            // Act & Assert
            await expect(client.getIssue(99999)).rejects.toThrow(RedmineApiError);
        });
    });
});
//# sourceMappingURL=get.test.js.map