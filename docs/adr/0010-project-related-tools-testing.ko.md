# 프로젝트 관련 도구 테스트 실시

## 상태

제안됨 - 2025-01-07

## 컨텍스트

ADR 0005에서 정한 인스펙터 도구를 활용한 테스트 전략에 기반하여 프로젝트 관련 도구 테스트를 실시합니다.
ADR 0004의 테스트 전략에 따라 데이터 변경을 수반하지 않는 GET 작업만을 테스트 대상으로 합니다.

### 테스트 대상 도구

프로젝트 관련 도구는 `src/tools/projects.ts`에서 다음과 같이 정의되어 있습니다:

```typescript
// 프로젝트 검색 도구
export const PROJECT_SEARCH_TOOL: Tool = {
  name: "search_projects",
  description:
    "Search for Redmine projects.\n" +
    "- Search by name or ID\n" +
    "- Filter by status\n" +
    "- Retrieve up to 100 projects",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search keywords",
      },
      status: {
        type: "number",
        description: "Status (1: active, 5: archived, 9: closed)",
        enum: [1, 5, 9],
      },
      include: {
        type: "string",
        description:
          "Include additional info (trackers,issue_categories,enabled_modules,time_entry_activities)",
        default: "",
      },
      limit: {
        type: "number",
        description: "Number of results (1-100)",
        default: 10,
      },
    },
    required: ["query"],
  },
};

// 프로젝트 상세 조회 도구
export const PROJECT_GET_TOOL: Tool = {
  name: "get_project",
  description:
    "Get detailed project information.\n" +
    "- Specify project ID (numeric) or identifier (string)\n" +
    "- Can include related information like trackers and categories",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Project ID (numeric) or identifier (string)",
      },
      include: {
        type: "string",
        description:
          "Include additional info (trackers,issue_categories,enabled_modules,time_entry_activities)",
        default: "",
      },
    },
    required: ["id"],
  },
};
```

## 목적

1. 각 파라미터 기능 확인:

   - 스키마에 정의된 모든 파라미터가 기대대로 작동하는지 확인
   - 파라미터 타입 체크가 올바르게 기능하는지 확인
   - 필수 파라미터 검증이 기능하는지 확인
   - 기본값이 올바르게 적용되는지 확인

2. 응답 검증:
   - 파라미터 변경이 적절히 Redmine API 요청에 반영되는지 확인
   - 조회된 데이터 형식이 기대대로인지 확인
   - include 파라미터로 추가 정보가 올바르게 조회되는지 확인

## 결정

인스펙터 도구를 사용하여 다음 검증을 수행합니다:

1. `search_projects`

   ```typescript
   // 타입 정의 확인
   properties: {
     query: string; // 필수
     status: number; // enum [1, 5, 9]
     include: string; // 쉼표로 구분된 목록
     limit: number; // 1-100, 기본값 10
   }
   ```

2. `get_project`
   ```typescript
   // 타입 정의 확인
   properties: {
     id: string; // 필수
     include: string; // 쉼표로 구분된 목록
   }
   ```

각 파라미터에 대해 다음 관점에서 검증 실시:

- 타입 경계값(타입 변환, 유효하지 않은 값 검증)
- 필수 체크(required: true 항목)
- 기본값 적용
- 열거형 값 제한(enum 지정이 있는 경우)
- 복합 데이터 형식(쉼표로 구분된 목록 등)

## 참고 자료

- [ADR 0004: 유닛 테스트 전략](./0004-unit-testing-strategy.ko.md)
- [ADR 0005: 인스펙터 도구를 활용한 테스트 전략](./0005-inspector-testing-strategy.ko.md)
- [Redmine REST API Projects](https://www.redmine.org/projects/redmine/wiki/Rest_Projects)
- [MCP TypeScript SDK Types](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/src/types.ts) 