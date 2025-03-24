# 유닛 테스트 도구 및 설정

## 상태

승인됨 - 2025-01-06
작성됨 - 2025-01-06
완료됨 - 2025-01-06

## 컨텍스트

[ADR 0004: 유닛 테스트 전략](./0004-unit-testing-strategy.ko.md)에서 결정한 테스트 전략을 실현하기 위해 구체적인 도구와 설정이 필요합니다.
구현을 진행하면서 다음과 같은 과제가 명확해졌습니다:

1. 테스트 프레임워크 선정과 설정
2. 목(mock) 구현 방침
3. TypeScript와의 통합
4. ES 모듈 대응
5. 테스트 헬퍼 구현 방침

## 결정

### 테스트 프레임워크와 환경

1. **프레임워크 구성**

   - Jest: 테스트 러너와 어서션
   - ts-jest: TypeScript 지원
   - Node.js 환경에서 테스트 실행

2. **환경 설정(jest.config.ts)**

   ```typescript
   const config: JestConfigWithTsJest = {
     preset: "ts-jest",
     testEnvironment: "node",

     // ESM 대응
     extensionsToTreatAsEsm: [".ts"],
     moduleNameMapper: {
       "^(\\.{1,2}/.*)\\.js$": "$1",
       "^@/(.*)$": "<rootDir>/src/$1",
     },
     transform: {
       "^.+\\.tsx?$": [
         "ts-jest",
         {
           useESM: true,
         },
       ],
     },

     // 글로벌 설정
     setupFilesAfterEnv: ["<rootDir>/src/lib/__tests__/helpers/setup.ts"],

     // 테스트 파일 패턴
     testMatch: [
       "**/__tests__/**/*.[jt]s?(x)",
       "**/?(*.)+(spec|test).[jt]s?(x)",
     ],

     // 커버리지 설정
     collectCoverage: true,
     coverageThreshold: {
       global: {
         branches: 80,
         functions: 90,
         lines: 80,
         statements: 80,
       },
     },
   };
   ```

### 목(Mock) 전략

1. **외부 API 목(mock) 처리**

   - 글로벌 fetch 목(mock)으로 외부 API 호출 시뮬레이션
   - setup.ts에서 글로벌 목(mock) 설정

   ```typescript
   // 목(mock)용 타입 정의와 설정
   beforeAll(() => {
     Object.defineProperty(global, "fetch", {
       writable: true,
       value: jest.fn(),
     });
   });

   afterEach(() => {
     jest.resetAllMocks();
   });
   ```

2. **응답 목(mock) 처리**

   - fixtures.ts에서 테스트 데이터를 일원화 관리
   - 실제 Response 객체를 반환하는 목(mock) 생성

   ```typescript
   export const mockResponse = (
     body: unknown,
     init?: ResponseInit
   ): Response => {
     return new Response(JSON.stringify(body), {
       status: 200,
       headers: { "Content-Type": "application/json" },
       ...init,
     });
   };
   ```

3. **Jest 목(mock) 구현 방침**

   ```typescript
   import {
     jest,
     expect,
     describe,
     it,
     beforeEach,
     afterEach,
   } from "@jest/globals";
   import type { Mock } from "jest-mock";

   let mockFetch: Mock;
   mockFetch = jest.spyOn(global, "fetch") as Mock;
   ```

   이 구현은:

   - `@jest/globals`에서 필요한 함수를 모두 가져옴
   - `jest-mock`에서 `Mock` 타입을 타입 정의로 가져옴
   - 목(mock)용 변수를 `Mock` 타입으로 정의
   - `spyOn`의 반환값을 `Mock` 타입으로 캐스팅

### URL과 파라미터 테스트

URL이나 쿼리 파라미터 테스트를 쉽게 하기 위한 헬퍼 함수 구현:

```typescript
// 테스트용 URL 파싱 함수
export function parseUrl(url: string): {
  base: string;
  params: Record<string, string>;
} {
  const urlObj = new URL(url);
  const base = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return { base, params };
}

// 테스트에서 사용 예(Issues)
it("fetches issues with parameters", async () => {
  const [url] = mockFetch.mock.calls[0] as [string, ...unknown[]];
  const { base, params } = parseUrl(url);

  // URL 기본 부분과 쿼리 파라미터를 별도로 검증
  expect(params).toEqual({
    offset: "0",
    limit: "25",
    project_id: "20",
    status_id: "open",
    sort: "updated_on:desc",
  });
});

// 테스트에서 사용 예(Users)
it("fetches users with parameters", async () => {
  const [url] = mockFetch.mock.calls[0] as [string, ...unknown[]];
  const { base, params } = parseUrl(url);

  // URL 기본 부분과 쿼리 파라미터를 별도로 검증
  expect(params).toEqual({
    offset: "0",
    limit: "25",
    status: "1",
    name: "john",
  });
});
```

주의사항:

- URL 파싱 결과는 기본 URL 부분에 쿼리 파라미터를 포함하지 않도록 함
- 쿼리 파라미터는 개별 객체로 취급
- 파라미터 값은 모두 문자열로 취급

### 테스트 디렉토리 구조

```
src/
└── lib/
    └── __tests__/
        ├── client/           # 클라이언트 테스트
        │   ├── base.test.ts  # 기본 기능 테스트
        │   ├── issues.test.ts
        │   ├── projects.test.ts
        │   ├── time_entries.test.ts
        │   └── users.test.ts
        └── types/            # 타입 정의 테스트
            ├── common.test.ts
            ├── issues/
            ├── projects/
            ├── time_entries/
            └── users/
```

## 결과

### 긍정적인 결과

1. **테스트 프레임워크와 설정**

   - TypeScript와 우수한 통합
   - ES 모듈 지원
   - 포괄적인 커버리지 리포트

2. **목(mock) 구현**

   - 글로벌 fetch의 일관된 목(mock) 처리
   - 응답 목(mock)의 재사용성
   - 타입 안전한 목(mock) 구현

3. **헬퍼 함수**
   - URL과 파라미터 테스트 용이
   - 코드 재사용성 향상
   - 테스트 가독성 향상

### 부정적인 결과

1. **설정의 복잡성**

   - ES 모듈 대응의 복잡한 설정
   - TypeScript 설정의 세부 조정 필요
   - ts-jest 설정 옵션 관리

2. **목(mock) 관리**

   - 글로벌 목(mock)의 상태 관리
   - 테스트 간 영향 가능성
   - 목(mock) 리셋 필요성

3. **학습 비용**
   - Jest, TypeScript, ts-jest 조합 이해
   - 목(mock) 패턴 습득
   - 헬퍼 함수 사용 방법

## 참고 자료

### Jest 관련

1. [Jest TypeScript Documentation](https://jestjs.io/docs/getting-started#using-typescript)

   - TypeScript 사용 시 공식 권장 설정
   - ts-jest 설정 방법

2. [DefinitelyTyped Jest](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest)

   - Jest의 타입 정의 구현
   - 현재 타입 정의의 제한사항

3. [Jest Source Code (jest-mock)](https://github.com/jestjs/jest/tree/main/packages/jest-mock)

   - Jest의 목(mock) 기능 구현
   - Mock 타입 정의

4. [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
   - ts-jest 설정 옵션
   - 타입 정의 다루는 방법

### 기타 참고 자료

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Node.js ESM Support](https://nodejs.org/api/esm.html)
- [TypeScript ESM Support](https://www.typescriptlang.org/docs/handbook/esm-node.html)
- [ADR 0004: 유닛 테스트 전략](./0004-unit-testing-strategy.ko.md) 