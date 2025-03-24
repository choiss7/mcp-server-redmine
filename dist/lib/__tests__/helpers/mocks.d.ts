/**
 * Create a mock success response
 */
export declare function mockResponse<T = unknown>(body: T, init?: ResponseInit): Promise<Response>;
/**
 * Create a mock error response
 */
export declare function mockErrorResponse(status: number, errors: string[]): Promise<Response>;
/**
 * Create a mock network error
 */
export declare function mockNetworkError(message: string): Promise<never>;
//# sourceMappingURL=mocks.d.ts.map