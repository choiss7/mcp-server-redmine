import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { RedmineClient } from "../../../lib/client/index.js";
import { mockResponse, mockErrorResponse } from "../../../lib/__tests__/helpers/mocks.js";
import * as fixtures from "../../../lib/__tests__/helpers/fixtures.js";
import { createUsersHandlers } from "../../users.js";
import { assertMcpToolResponse } from "../../../lib/__tests__/helpers/mcp.js";
import config from "../../../lib/config.js";
describe('list_users', () => {
    let client;
    let mockFetch;
    let handlers;
    beforeEach(() => {
        client = new RedmineClient();
        mockFetch = jest.spyOn(global, "fetch");
        mockFetch.mockReset();
        handlers = createUsersHandlers({ client, config });
    });
    describe('MCP Response Format', () => {
        it('returns valid MCP response for successful fetch', async () => {
            // Arrange
            mockFetch.mockImplementationOnce(() => mockResponse(fixtures.userListResponse));
            // Act
            const response = await handlers.list_users({});
            // Assert
            assertMcpToolResponse(response);
            expect(response.isError).toBe(false);
            expect(response.content[0]).toEqual({
                type: "text",
                text: expect.stringContaining("<?xml")
            });
        });
        it('returns valid MCP error response for unauthorized access', async () => {
            // Arrange
            const errorMessage = "Unauthorized access";
            mockFetch.mockImplementationOnce(() => mockErrorResponse(401, [errorMessage]));
            // Act
            const response = await handlers.list_users({});
            // Assert
            assertMcpToolResponse(response);
            expect(response.isError).toBe(true);
            expect(response.content[0]).toEqual({
                type: "text",
                text: expect.stringContaining(errorMessage)
            });
        });
        it('returns valid MCP error response for forbidden access', async () => {
            // Arrange
            const errorMessage = "Administrator privileges required";
            mockFetch.mockImplementationOnce(() => mockErrorResponse(403, [errorMessage]));
            // Act
            const response = await handlers.list_users({});
            // Assert
            assertMcpToolResponse(response);
            expect(response.isError).toBe(true);
            expect(response.content[0]).toEqual({
                type: "text",
                text: expect.stringContaining(errorMessage)
            });
        });
    });
    // ... 他のテストケース
});
//# sourceMappingURL=list.test.js.map