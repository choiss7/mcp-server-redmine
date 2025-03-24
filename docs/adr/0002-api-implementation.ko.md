# Redmine API 구현의 기본 방침

## 상태

폐기됨 - 2025-01-05

## 컨텍스트

MCP 서버에 Redmine API의 구현 방침을 결정할 필요가 있습니다.
다음 사항을 고려합니다:

- 서버 초기화 및 설정
- 구현 접근 방식
- 대상 API 범위
- 데이터 형식의 선택
- 코드 구성

## 결정

다음과 같은 구현 방침을 채택합니다:

### 1. 코드 구성과 접근 방식

모듈을 분할하고 책임을 명확히 나누어 구현합니다:

```
src/
  ├── config.ts    - 설정 관리
  ├── types.ts     - 타입 정의와 스키마
  ├── client.ts    - Redmine API 클라이언트
  ├── handlers.ts  - MCP 요청 핸들러
  └── index.ts     - 엔트리포인트
```

각 모듈의 역할:

#### config.ts - 환경 변수와 설정 관리
```typescript
const ConfigSchema = z.object({
  redmine: z.object({
    apiKey: z.string({
      required_error: "REDMINE_API_KEY environment variable is required",
    }),
    host: z
      .string({
        required_error: "REDMINE_HOST environment variable is required",
      })
      .url("REDMINE_HOST must be a valid URL"),
  }),
  server: z.object({
    name: z.string().default("@yonaka15/mcp-server-redmine"),
    version: z.string().default("0.1.0"),
  }),
});
```

#### client.ts - API 통신 구현
```typescript
export class RedmineClient {
  private async performRequest<T>(path: string, options?: RequestInit): Promise<T> {
    const url = new URL(path, config.redmine.host);
    const response = await fetch(url, {
      ...options,
      headers: {
        "X-Redmine-API-Key": config.redmine.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json() as RedmineErrorResponse;
      throw new RedmineApiError(
        response.status,
        response.statusText,
        error.errors
      );
    }

    return response.json();
  }
}
```

### 2. 대상 API 범위

Stable 상태의 리소스만 대상으로 합니다:

1. Issues (1.0~)
   - 이슈 생성, 조회, 업데이트, 삭제
2. Projects (1.0~)
   - 프로젝트 조회, 업데이트, 아카이브
3. Users (1.1~)
   - 사용자 정보 조회
4. Time Entries (1.1~)
   - 작업 시간 기록, 조회

### 3. 데이터 형식

JSON 형식을 채택하고, zod를 통한 타입 정의와 유효성 검사를 구현합니다:

```typescript
// 쿼리 파라미터 스키마
export const IssueQuerySchema = z.object({
  offset: z.number().int().min(0).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sort: z.string().optional(),
  include: z.string().transform(str => str.split(",").filter(Boolean)).optional(),
  // ...기타 파라미터
});

// 리소스 스키마
export const RedmineIssueSchema = z.object({
  id: z.number(),
  project: z.object({
    id: z.number(),
    name: z.string(),
  }),
  // ...기타 필드
});

// 에러 타입 정의
export class RedmineApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly errors: string[]
  ) {
    super(`Redmine API error: ${status} ${statusText}\n${errors.join(", ")}`);
    this.name = "RedmineApiError";
  }
}
```

### 4. 에러 핸들링

- 커스텀 에러 클래스를 통한 상세한 에러 정보 제공
- API 응답 코드에 따른 적절한 처리
- 유효성 검사 오류의 명확한 알림

## 결과

이 결정은 구현을 진행하는 과정에서 다음과 같은 이유로 폐기되었습니다:

1. 파일 구성의 불충분
   - 도구 정의와 포맷 처리가 혼재
   - 코드의 비대화가 예상됨

2. 책임 분리의 불충분
   - 핸들러에 많은 책임이 집중
   - 테스트가 어려운 구조

이러한 문제를 해결하기 위해 [ADR 0003: 모듈 분할 및 디렉토리 구조 정리](./0003-separate-modules.md)에서 더 상세한 구현 방침이 정의되었습니다.

그러나 본 ADR에서 정의된 다음 요소는 새로운 구현에서도 계승되었습니다:
- 설정 관리 방침
- API 클라이언트의 기본 구조
- 대상 API의 범위
- 데이터 형식과 유효성 검사 방침
- 에러 핸들링 방침

## 참고 자료

- [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api)
- [Redmine REST Issues API](https://www.redmine.org/projects/redmine/wiki/Rest_Issues)
- [Redmine REST Projects API](https://www.redmine.org/projects/redmine/wiki/Rest_Projects)
- [Redmine REST Time Entries API](https://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries)
- [Redmine REST Users API](https://www.redmine.org/projects/redmine/wiki/Rest_Users)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [ADR 0003: 모듈 분할 및 디렉토리 구조 정리](./0003-separate-modules.md) 