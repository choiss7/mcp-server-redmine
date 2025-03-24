/**
 * Create a mock success response
 */
export function mockResponse(body, init) {
    const response = new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        ...init
    });
    return Promise.resolve(response);
}
/**
 * Create a mock error response
 */
export function mockErrorResponse(status, errors) {
    const response = new Response(JSON.stringify({ errors }), {
        status,
        statusText: "Error",
        headers: { "Content-Type": "application/json" }
    });
    return Promise.resolve(response);
}
/**
 * Create a mock network error
 */
export function mockNetworkError(message) {
    return Promise.reject(new Error(message));
}
//# sourceMappingURL=mocks.js.map