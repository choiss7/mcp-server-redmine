# client.ts와 types.ts 분할

## 상태

완료 - 2025-01-06

## 컨텍스트

유닛 테스트 전략(ADR 0004)을 구현하는 과정에서 다음과 같은 문제에 직면했습니다:

1. 현재 코드베이스 상황
   - client.ts(약 400줄)에 모든 API 클라이언트 로직이 집중됨
   - types.ts(여러 타입 정의와 스키마)가 비대해짐
   - 테스트 작성과 유지보수가 어려움
   - 코드 변경의 영향 범위가 큼

2. 구체적인 문제점
   - 단위 테스트 작성 시 모킹 범위가 넓어짐
   - 타입 정의 업데이트가 다른 기능에 영향을 주기 쉬움
   - 파일이 너무 커서 리뷰가 어려움
   - 여러 사람이 동시에 개발하기 어려움

3. 관련 ADR
   - ADR 0003(모듈 분할) 방침 계승
   - ADR 0004(유닛 테스트) 구현에 대응

4. 모듈 해결 제약사항
   - Node.js의 ESM/CJS 호환성 대응 필요
   - `moduleResolution: "node16"` 또는 `"nodenext"` 사용 시:
     - ES 모듈 가져오기에서는 확장자 명시 필수
     - CommonJS 모듈에서는 확장자 생략 가능
   - 가져오기 경로에는 출력 파일의 확장자 지정 필요
     - `.mts` 파일은 `.mjs`로 출력
     - `.cts` 파일은 `.cjs`로 출력
     - `.ts` 파일은 package.json의 `"type"` 필드에 따라 해결

## 결정

기존 기능을 유지하면서 다음과 같은 파일 분할을 진행합니다:

### 1. 디렉토리 구조

```
src/
├── lib/
│   ├── client/           # API 클라이언트 관련
│   │   ├── base.ts       # 기본 클라이언트 기능 + 오류
│   │   ├── issues.ts     # Issues 리소스용 클라이언트
│   │   ├── projects.ts   # Projects 리소스용 클라이언트
│   │   ├── time_entries.ts # TimeEntries 리소스용 클라이언트
│   │   └── index.ts      # 클라이언트 내보내기
│   ├── types/            # 타입 정의 관련
│   │   ├── common.ts     # 공통 타입 정의·상수
│   │   ├── issues/       # Issues 관련 타입 정의
│   │   │   ├── schema.ts # Zod 스키마
│   │   │   └── types.ts  # TypeScript 타입 정의
│   │   ├── projects/     # Projects 관련 타입 정의
│   │   └── time_entries/ # TimeEntries 관련 타입 정의
│   └── config.ts         # 설정(기존)
```

### 2. 분할 방침

#### 클라이언트 분할 방침
- 기존 `RedmineClient` 클래스 기능을 리소스별로 분할
- `base.ts`에 공통 기능(performRequest, encodeQueryParams)과 오류 정의 배치
- 각 리소스의 API 메서드를 해당 파일로 이동
- 인터페이스나 기능은 변경하지 않고 파일 분할만 실행

#### 타입 정의 분할 방침
- 리소스별로 타입 정의와 스키마 분리
- 공통 타입 정의와 상수는 `common.ts`에 통합
- 기존 유효성 검사 함수는 관련 스키마와 같은 파일에 배치
- 타입 정의 내용은 변경하지 않고 파일 분할만 실행

#### 모듈 참조 방침
- 모든 상대 가져오기에서 `.js` 확장자 사용(출력 파일 확장자에 맞춤)
- 타입 정의 가져오기는 `/index.js` 사용
- 패키지 가져오기는 확장자 없이 유지

### 3. 테스트 디렉토리 구조

```
src/
└── lib/
    └── __tests__/
        ├── client/           # 클라이언트 테스트
        │   ├── base.test.ts  # 기본 기능 테스트
        │   ├── issues.test.ts
        │   ├── projects.test.ts
        │   └── time_entries.test.ts
        └── types/            # 타입 정의 테스트
            ├── common.test.ts
            ├── issues/
            ├── projects/
            └── time_entries/
```

## 결과

### 긍정적인 결과

1. 테스트 용이성 향상
   - 테스트 파일과 테스트 대상의 1:1 대응
   - 모킹 범위가 제한적으로
   - 테스트 케이스 관리 용이

2. 유지보수성 향상
   - 파일 크기가 적정화
   - 변경 영향 범위가 명확하게
   - 코드 리뷰가 용이하게

3. 개발 효율성 향상
   - 병렬 개발 가능
   - 충돌 리스크 감소
   - 관련 코드 식별 용이

4. 모듈 해결 신뢰성 향상
   - Node.js 모듈 해결 규칙 준수
   - 실행 시 해결 오류 방지
   - 개발 시 타입 체크 엄격화

### 부정적인 결과

1. 프로젝트 구조 복잡화
   - 파일 수 증가
   - 디렉토리 계층 심화
   - 가져오기 경로 관리 필요

2. 초기 비용
   - 기존 코드 마이그레이션 작업
   - 테스트 코드 업데이트
   - 문서 업데이트

3. 확장자 관리 오버헤드
   - 가져오기 구문에서 `.js` 확장자 명시 필요
   - 리팩토링 시 추가 작업

### 추가 영향

리팩토링 작업 중 다음과 같은 영향이 있었습니다:

1. 테스트 코드 손실
   - 리팩토링 과정에서 테스트 코드가 손실되는 사태 발생
   - 0004의 테스트 전략에 기반하여 재구현 필요
   - 모듈 분할로 더 세분화된 단위의 테스트 재구현 가능

2. 테스트 재구현 필요성
   - 클라이언트 분할에 맞춘 테스트 재설계
   - 새 디렉토리 구조에 맞춘 테스트 파일 배치
   - 공통 부분의 테스트 헬퍼 생성

## 참고 자료

- [ADR 0003: 모듈 분할](./0003-separate-modules.ko.md)
- [ADR 0004: 유닛 테스트 전략](./0004-unit-testing-strategy.ko.md)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api)
- [TypeScript: moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution)
- [TypeScript: Module Resolution](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution)
- [Node.js Documentation: ECMAScript Modules](https://nodejs.org/api/esm.html)
- [Node.js Documentation: Modules: CommonJS modules](https://nodejs.org/api/modules.html) 