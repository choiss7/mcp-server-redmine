# MCP 응답 유효성 검증 구현

## 상태

제안됨 - 2025-01-15
채택됨 - 2025-01-16
구현됨 - 2025-01-18

## 컨텍스트

ADR-0012에서 우리는 MCP 응답 유효성 검증의 필요성을 확인했습니다. Redmine API 응답을 그대로 전달하는 것은 안정성과 예측 가능성 측면에서 문제가 됩니다. API 변경이나 예상치 못한 응답 형식이 클라이언트 측 오류를 유발할 수 있기 때문입니다.

이 ADR은 응답 유효성 검증 구현 계획의 세부 사항을 정의합니다.

## 결정

다음과 같은 구현 전략을 채택하기로 결정했습니다:

### 1. 스키마 기반 유효성 검증

1. **스키마 정의**: 각 Redmine 리소스 타입에 대한 Zod 스키마를 `formatters/schemas` 디렉토리에 정의합니다.
2. **유효성 검증 계층**: 모든 API 응답을 스키마로 검증하는 중간 계층을 추가합니다.
3. **변환 로직**: 필요한 경우 응답 데이터를 변환하는 함수를 제공합니다.

### 2. 디렉토리 구조

```
src/
  formatters/
    schemas/           # Zod 스키마 정의
      issues.ts
      projects.ts
      time_entries.ts
      users.ts
      common.ts        # 공통 타입
    transforms/        # 데이터 변환 함수(필요시)
    validators/        # 유효성 검증 함수
    index.ts           # 내보내기 및 공통 유틸리티
```

### 3. 유효성 검증 워크플로우

1. Redmine API에서 응답 수신
2. 응답을 적절한 스키마로 유효성 검증
3. 유효성 검증 실패 시 오류 반환
4. 유효성 검증 성공 시 필요한 변환 적용
5. 검증된 데이터 반환

### 4. 오류 처리

1. **유효성 검증 오류**: 명확한 오류 메시지와 함께 `ValidationError` 반환
2. **예상치 못한 응답**: 일관된 오류 포맷으로 `UnexpectedResponseError` 반환
3. **로깅**: 디버깅을 위해 상세한 유효성 검증 오류 로깅

## 구현 세부 사항

### 스키마 예시 (issues.ts)

```typescript
import { z } from "zod";
import { commonFields } from "./common.js";

// 이슈 리소스 스키마
export const issueSchema = z.object({
  id: z.number(),
  project: z.object({
    id: z.number(),
    name: z.string(),
  }),
  tracker: z.object({
    id: z.number(),
    name: z.string(),
  }),
  status: z.object({
    id: z.number(),
    name: z.string(),
  }),
  priority: z.object({
    id: z.number(),
    name: z.string(),
  }),
  author: z.object({
    id: z.number(),
    name: z.string(),
  }),
  subject: z.string(),
  description: z.string().optional(),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
  done_ratio: z.number().optional(),
  created_on: z.string(),
  updated_on: z.string(),
  // ... 추가 필드
});

// 이슈 목록 응답 스키마
export const issuesListResponseSchema = z.object({
  issues: z.array(issueSchema),
  total_count: z.number(),
  offset: z.number().optional(),
  limit: z.number().optional(),
});

// 단일 이슈 응답 스키마
export const issueResponseSchema = z.object({
  issue: issueSchema,
});
```

### 유효성 검증 함수 예시 (validators/issues.ts)

```typescript
import { issuesListResponseSchema, issueResponseSchema } from "../schemas/issues.js";
import { ValidationError } from "../../lib/errors.js";

/**
 * 이슈 목록 응답 유효성 검증
 */
export function validateIssuesListResponse(data: unknown) {
  try {
    return issuesListResponseSchema.parse(data);
  } catch (error) {
    throw new ValidationError("이슈 목록 응답 형식이 유효하지 않습니다", error);
  }
}

/**
 * 단일 이슈 응답 유효성 검증
 */
export function validateIssueResponse(data: unknown) {
  try {
    return issueResponseSchema.parse(data);
  } catch (error) {
    throw new ValidationError("이슈 응답 형식이 유효하지 않습니다", error);
  }
}
```

### 핸들러 통합 예시

```typescript
import { validateIssuesListResponse } from "../formatters/validators/issues.js";
import { client } from "../lib/client.js";

export const listIssuesHandler = async (params: unknown) => {
  // API 요청
  const response = await client.getIssues(params);
  
  // 응답 유효성 검증
  const validatedResponse = validateIssuesListResponse(response);
  
  // 검증된 응답 반환
  return validatedResponse;
};
```

## 결과

### 긍정적인 결과

1. **런타임 안정성**: 예상치 못한 API 응답으로부터 보호
2. **타입 안전성**: 애플리케이션 전체에서 일관된 데이터 구조 보장
3. **디버깅 용이성**: 유효성 검증 오류에 대한 명확한 메시지
4. **문서화**: 스키마가 API 응답 구조를 문서화
5. **테스트 가능성**: 독립적으로 테스트 가능한 유효성 검증 계층

### 부정적인 결과

1. **추가 복잡성**: 코드베이스의 복잡성 증가
2. **유지보수 오버헤드**: Redmine API 변경 시 스키마 업데이트 필요
3. **성능 영향**: 추가 검증 단계로 인한 약간의 성능 영향

## 구현 단계

1. `formatters` 디렉토리 구조 생성
2. 공통 타입 및 기본 스키마 정의
3. 리소스별 스키마 구현
4. 유효성 검증 함수 구현
5. 핸들러에 유효성 검증 통합
6. 유효성 검증 코드에 대한 단위 테스트 작성
7. 문서화 및 사용 예제 추가

## 참고 자료

- [Zod 문서](https://github.com/colinhacks/zod)
- [Redmine API 문서](https://www.redmine.org/projects/redmine/wiki/Rest_api)
- [타입스크립트 타입 유효성 검증 모범 사례](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) 