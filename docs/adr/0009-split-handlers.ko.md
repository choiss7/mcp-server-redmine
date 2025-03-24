# 핸들러 모듈 분할

## 상태

제안됨 - 2025-01-06
완료됨 - 2025-01-07

## 컨텍스트

현재 프로젝트에서는 모든 MCP 요청 핸들러가 `src/handlers.ts`에 집중되어 있습니다.
하지만 다음과 같은 문제가 발생하고 있습니다:

1. 파일이 비대해져 유지보수가 어려워짐
2. 각 도구(Issues, Projects, Time Entries, Users)의 핸들러가 혼재됨
3. 테스트 작성이 복잡해짐
4. 코드 재사용이 어려움
5. 도구 단위 개발이나 디버깅이 효율적이지 않음

또한 MCP의 각 도구가 각각 독립된 기능을 가지는 점을 고려하면,
핸들러도 도구별로 분할하는 것이 바람직하다고 판단됩니다.

## 결정

handlers.ts를 다음과 같이 분할하기로 결정했습니다:

```
src/
├── handlers/
│   ├── index.ts          # 핸들러 엔트리포인트
│   ├── issues.ts         # Issues 핸들러
│   ├── projects.ts       # Projects 핸들러
│   ├── time_entries.ts   # Time Entries 핸들러
│   ├── users.ts          # Users 핸들러
│   └── types.ts          # 공통 타입 정의
```

### 구현 방침

1. 분할 기준

   - 도구 종류별로 독립된 파일 생성
   - 공통 타입 정의는 types.ts에 통합
   - index.ts에서 핸들러를 통합하고 내보내기

2. 각 파일의 책임

   - `index.ts`: 모든 핸들러 등록 및 내보내기
   - `issues.ts`: 이슈 관련 핸들러
   - `projects.ts`: 프로젝트 관련 핸들러
   - `time_entries.ts`: 작업 시간 관련 핸들러
   - `users.ts`: 사용자 관련 핸들러
   - `types.ts`: 공통 타입 정의 및 인터페이스

3. 마이그레이션 절차
   - 새 디렉토리 구조 생성
   - 각 도구 핸들러를 해당 파일로 이동
   - 의존 관계 정리 및 수정
   - 테스트 업데이트

### 코드 구조

```typescript
// handlers/types.ts
export interface HandlerContext {
  client: RedmineClient;
  config: Config;
}

// handlers/issues.ts
export function createIssuesHandlers(context: HandlerContext) {
  return {
    search_issues: async (params: SearchIssuesParams) => {
      // 구현
    },
    // 다른 Issues 핸들러
  };
}

// handlers/index.ts
export function createHandlers(context: HandlerContext) {
  return {
    ...createIssuesHandlers(context),
    ...createProjectsHandlers(context),
    ...createTimeEntriesHandlers(context),
    ...createUsersHandlers(context),
  };
}
```

## 결과

### 긍정적인 결과

1. 코드 정리와 유지보수성 향상

   - 각 도구의 로직이 독립됨
   - 파일 크기가 적절하게 관리 가능
   - 관심사 분리가 명확함

2. 개발 효율성 향상

   - 도구 단위 개발이 용이함
   - 테스트 작성이 간결해짐
   - 디버깅이 효율화됨

3. 확장성 향상
   - 새로운 도구 추가가 용이함
   - 도구 단위 버전 관리
   - 기능의 단계적 구현

### 부정적인 결과

1. 파일 수 증가

   - 프로젝트 구조의 복잡화
   - 가져오기(import) 구문 증가
   - 초기 학습 비용 상승

2. 리팩토링 공수

   - 기존 코드 마이그레이션 작업
   - 테스트 업데이트
   - 문서 업데이트

3. 상호 의존성 관리
   - 모듈 간 의존 관계 정리
   - 순환 참조 방지
   - 인터페이스 일관성 유지

## 참고 자료

- [ADR-0001: 프로젝트 기본 구조](./0001-base-project-structure.ko.md)

  - 디렉토리 구조 기본 방침

- [ADR-0003: 모듈 분할](./0003-separate-modules.ko.md)

  - 모듈 분할 개념

- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
  - MCP 서버 구현 패턴 