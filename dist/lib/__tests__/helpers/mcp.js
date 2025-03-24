/**
 * Asserts that a response conforms to the MCP CallToolResult schema
 */
export function assertMcpToolResponse(response) {
    // 構造の検証
    expect(response).toHaveProperty('content');
    expect(response).toHaveProperty('isError');
    const typedResponse = response;
    // コンテンツ配列の検証
    expect(Array.isArray(typedResponse.content)).toBe(true);
    expect(typedResponse.content.length).toBeGreaterThan(0);
    // 各コンテンツアイテムの検証
    typedResponse.content.forEach(item => {
        expect(item).toHaveProperty('type');
        switch (item.type) {
            case 'text':
                expect(item).toHaveProperty('text');
                expect(typeof item.text).toBe('string');
                expect(item.text.length).toBeGreaterThan(0);
                break;
            case 'image':
                expect(item).toHaveProperty('data');
                expect(item).toHaveProperty('mimeType');
                expect(typeof item.data).toBe('string');
                expect(typeof item.mimeType).toBe('string');
                break;
            case 'resource':
                expect(item).toHaveProperty('resource');
                const resourceItem = item;
                expect(resourceItem.resource).toHaveProperty('uri');
                if ('text' in resourceItem.resource) {
                    expect(typeof resourceItem.resource.text).toBe('string');
                }
                else {
                    expect(typeof resourceItem.resource.blob).toBe('string');
                }
                break;
        }
    });
}
function createTextContent(content) {
    return {
        type: "text",
        text: content
    };
}
function createImageContent(content) {
    return {
        type: "image",
        data: Buffer.from(content).toString('base64'),
        mimeType: "image/png"
    };
}
function createResourceContent(content) {
    const resource = {
        uri: content,
        mimeType: "text/plain",
        text: content
    };
    return {
        type: "resource",
        resource
    };
}
/**
 * Creates a valid MCP tool response fixture for testing
 */
export function createMcpToolResponseFixture(content, type = 'text', isError = false) {
    let contentItem;
    switch (type) {
        case "text":
            contentItem = createTextContent(content);
            break;
        case "image":
            contentItem = createImageContent(content);
            break;
        case "resource":
            contentItem = createResourceContent(content);
            break;
        default:
            throw new Error(`Unsupported content type: ${type}`);
    }
    return {
        content: [contentItem],
        isError
    };
}
//# sourceMappingURL=mcp.js.map