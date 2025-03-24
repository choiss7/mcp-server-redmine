# Claude Desktop용 도구 설명 수정

## 상태

제안됨 - 2025-02-01

채택됨 - 2025-02-01

구현됨 - 2025-02-02

## 컨텍스트

Claude Desktop 애플리케이션의 최신 업데이트는 AI 도구 호출의 처리 방식을 변경했습니다. 특히, 도구 설명의 렌더링에서 이전에는 영문 설명으로 작성된 일부 마크다운 형식이 제대로 표시되지 않는 문제가 발생하고 있습니다.

현재 도구의 설명은 다음 형식을 사용합니다:

```typescript
export const ISSUE_LIST_TOOL: Tool = {
  name: "list_issues",
  description:
    "Return list of issues visible by user.\n" +
    "This list can be filtered by many parameters.\n" +
    "Available since Redmine 1.1",
  inputSchema: {
    // ...
  }
};
```

Claude Desktop는 표준 마크다운을 기대하지만, 현재 MCP 도구 설명은 일부 마크다운이나 설명에 예시 값이 포함된 경우 특히 오해를 유발할 수 있습니다. 이 문제를 해결하기 위해 도구 설명을 Claude Desktop과 더 호환되는 형식으로 업데이트할 필요가 있습니다.

## 결정

도구 설명을 다음과 같이 업데이트하기로 결정했습니다:

1. 모든 도구 설명을 Markdown 텍스트로 포맷
2. 줄바꿈을 위해 `\n` 대신 마크다운 문법 사용
3. 코드 샘플이나 예시는 마크다운 코드 블록(```` ```code``` ````)으로 감싸기
4. 목록을 `- ` 또는 `1. ` 마크다운 형식으로 사용
5. 중요한 정보는 **굵게** 또는 *이탤릭체*로 강조

### 도구 설명 예시

**변경 전:**
```typescript
description:
  "Return list of issues visible by user.\n" +
  "This list can be filtered by many parameters.\n" +
  "Available since Redmine 1.1",
```

**변경 후:**
```typescript
description:
  "Return list of issues visible by user.\n\n" +
  "This list can be filtered by many parameters.\n\n" +
  "*Available since Redmine 1.1*",
```

### 인수 설명 예시

**변경 전:**
```typescript
inputSchema: {
  type: "object",
  properties: {
    status_id: {
      type: "string",
      description: 
        "Filter by status: open (default), closed, * (all)" +
        "Or multiple statuses separated by |",
    },
    // ...
  }
}
```

**변경 후:**
```typescript
inputSchema: {
  type: "object",
  properties: {
    status_id: {
      type: "string",
      description: 
        "Filter by status: `open` (default), `closed`, `*` (all)\n\n" +
        "Or multiple statuses separated by `|`",
    },
    // ...
  }
}
```

## 구현

모든 도구 정의 파일을 업데이트하여 설명을 새 형식으로 변경해야 합니다:

- `src/tools/issues.ts`
- `src/tools/projects.ts`
- `src/tools/time_entries.ts`
- `src/tools/users.ts`

예시 구현:

```typescript
// issues.ts 업데이트
export const ISSUE_LIST_TOOL: Tool = {
  name: "list_issues",
  description:
    "Return list of issues visible by user.\n\n" +
    "This list can be filtered by many parameters.\n\n" +
    "*Available since Redmine 1.1*",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: 
          "Get issues from the specified project.\n\n" +
          "Possible values:\n" +
          "- project id\n" +
          "- `project:identifier`",
      },
      // ...
    }
  }
};
```

## 결과

### 긍정적인 결과

1. Claude Desktop에서 도구 설명이 잘 렌더링됨
2. 개선된 가독성으로 사용자 경험 향상
3. 마크다운 형식으로 인해 문서 스타일 일관성 유지
4. 복잡한 설명을 더 구조화된 방식으로 표현 가능

### 부정적인 결과

1. 모든 도구 설명을 업데이트하는 데 필요한 시간
2. 가독성 향상을 위해 설명이 길어질 수 있음
3. 다른 도구에서는 기존 형식이 더 적합할 수 있음
4. 도구 설명 관리를 위한 추가 노력 필요

## 참고

이 변경은 기능적인 변경이 아니라 표현 방식의 변경입니다. 도구의 동작이나 기능은 그대로 유지되며, 오직 사용자 인터페이스 관점에서만 변경이 있습니다.

## 테스트

Claude Desktop에서 업데이트된 도구를 테스트하여 다음을 확인해야 합니다:

1. 모든 마크다운 형식이 올바르게 렌더링됨
2. 줄바꿈이 의도한 대로 표시됨
3. 코드 블록이 올바르게 강조됨
4. 목록과 강조가 가독성을 향상시킴 