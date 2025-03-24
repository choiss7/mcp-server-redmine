# 유닛 테스트 전략

## 상태

승인됨 - 2025-01-06
업데이트 - 2025-01-06 - 테스트 안전성 방침 명확화
완료됨 - 2025-01-06

## 컨텍스트

Redmine용 MCP 서버의 코드 품질과 신뢰성을 확보하기 위해 유닛 테스트가 필요합니다. 다음 ADR을 거쳐 구현이 안정화되었습니다:

1. 프로젝트 기본 구조(0001)
2. API 구현(0002, 폐기됨)
3. 모듈 분할(0003)
4. 클라이언트와 타입 정의 분리(0006)

특히 데이터 안전성에 관하여 다음 사항을 고려해야 합니다:

1. 테스트 실행 시 실제 데이터 영향 방지
2. API 호출의 안전성 확보
3. 테스트 환경과 운영 환경의 분리
4. 의도하지 않은 데이터 변경 방지

## 결정

### 1. 테스트 안전성 전략

#### 1.1. 테스트 대상의 제한

- **GET 작업만 테스트 대상으로 함**

  - 데이터 읽기만 수행하는 GET 작업 테스트
  - 응답 형식과 데이터 구조 검증에 중점
  - 오류 케이스를 포함한 종합적인 테스트

- **데이터 변경 작업의 테스트는 제외**
  - POST(생성) 작업은 모두 건너뜀
  - PUT(업데이트) 작업은 모두 건너뜀
  - DELETE(삭제) 작업은 모두 건너뜀
  - 건너뛰는 이유를 각 테스트 파일에 명확히 기술

#### 1.2. 테스트 파일 구성

```typescript
describe("API Method (POST/PUT/DELETE)", () => {
  // 데이터 변경 작업의 테스트는 건너뜀
  it.skip("all operations are skipped for safety", () => {
    // API 사양과 건너뛰는 이유를 상세히 기술
    // - 받는 파라미터
    // - 작업의 영향
    // - 건너뛰는 이유
  });
});

describe("API Method (GET)", () => {
  // 정상 케이스
  it("fetches data successfully", async () => {
    // GET 요청의 테스트 구현
  });

  // 오류 케이스
  it("handles API error appropriately", async () => {
    // 오류 처리 테스트 구현
  });
});
```

#### 1.3. 목(Mock) 사용 방침

- **fetch의 목(Mock)화**

  - 전역 fetch를 목(Mock)하여 실제 API 호출 방지
  - 정의되지 않은 fetch 호출은 오류를 발생하도록 설정
  - 응답은 모두 목(Mock) 데이터 사용

- **응답 데이터 관리**
  - 테스트 픽스처로 정의
  - API의 실제 응답 형식 준수
  - 필요 최소한의 데이터셋 준비

### 2. 테스트 구현 프로세스

각 API 엔드포인트의 테스트를 구현할 때 다음 절차를 따릅니다:

1. **메소드 분류**

   - GET 작업의 경우: 테스트 구현
   - POST/PUT/DELETE 작업의 경우: 건너뛰는 이유 문서화

2. **GET 작업의 테스트 구현**

   - API 사양 확인
   - 응답 형식 검증
   - 오류 케이스 검증
   - 파라미터 검증

3. **테스트 문서화**
   - 건너뛰는 작업에 대한 이유 명시
   - API 사양과의 일관성 설명
   - 구현상의 제약이나 확장 기술

### 3. 커버리지 고려사항

- **측정 대상 조정**

  - GET 작업에 관한 부분만 커버리지 측정 대상으로 함
  - 데이터 변경 작업 건너뛰기로 인한 커버리지 감소는 허용

- **품질 지표**
  - GET 메소드에 관해서는 높은 커버리지 유지
  - 오류 케이스의 종합적인 테스트
  - 응답 형식의 완전한 검증

### 4. 구현 구조

테스트 파일은 다음 구조로 정리합니다:

```
src/
├── lib/
│   ├── __tests__/
│   │   ├── helpers/          # 테스트 헬퍼
│   │   │   ├── fixtures.ts   # 테스트 데이터
│   │   │   ├── setup.ts      # 전역 설정
│   │   │   └── mocks.ts      # 공통 목(Mock)
│   │   ├── client/           # 클라이언트 테스트
│   │   │   ├── base/         # 기본 기능 테스트
│   │   │   │   ├── request.test.ts
│   │   │   │   └── params.test.ts
│   │   │   ├── issues/       # Issues API 테스트
│   │   │   │   ├── get.test.ts
│   │   │   │   ├── post.test.ts
│   │   │   │   ├── put.test.ts
│   │   │   │   └── delete.test.ts
│   │   │   ├── projects/     # Projects API 테스트
│   │   │   └── time_entries/ # TimeEntries API 테스트
│   │   └── types/            # 타입 테스트
│   │       ├── issues/
│   │       ├── projects/
│   │       └── time_entries/
```

이 구조의 장점:

- 기능별 테스트 파일 분리(API, 클라이언트 기본 기능, 타입)
- 도메인별 테스트 정리(issues, projects, time_entries)
- 테스트 코드의 가시성 향상
- 유지보수 용이성
- 테스트 헬퍼의 재사용성 향상

주요 테스트 파일의 역할:

1. **base/**

   - 요청 처리 공통 기능
   - 파라미터 처리 유틸리티
   - 오류 처리

2. **helpers/**

   - `fixtures.ts`: 테스트 데이터 정의
   - `setup.ts`: Jest 설정과 전역 목(Mock)
   - `mocks.ts`: 목(Mock) 응답 생성

3. **각 API의 테스트 디렉토리**
   - `get.test.ts`: GET 요청의 완전한 테스트
   - `post.test.ts`, `put.test.ts`, `delete.test.ts`: 작업 설명과 건너뛰는 이유

## 결과

### 긍정적인 결과

1. **안전성 향상**

   - 데이터 변경 작업의 완전한 제외로 안전성 확보
   - 의도하지 않은 API 호출 방지
   - 테스트 환경 보호

2. **테스트 명확화**

   - 테스트 대상의 명확한 정의
   - 건너뛰는 이유 문서화
   - API 사양과의 일관성 확보

3. **유지보수성 향상**
   - 테스트 파일 구조의 통일
   - 테스트 범위의 명확한 경계
   - 문서화된 제약 사항

### 부정적인 결과

1. **커버리지 영향**

   - 데이터 변경 작업 테스트 건너뛰기로 인한 커버리지 감소
   - 실제 성공 케이스의 동작 확인이 제한적

2. **테스트 제한**

   - 데이터 생성·업데이트·삭제 동작 확인이 수동에 의존
   - 환경 의존적 문제의 조기 발견이 어려움

3. **운영상 과제**
   - 수동 테스트의 중요성 증가
   - 운영 환경에서의 신중한 검증 필요

## 참고 자료

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api)
- [Issues REST API](https://www.redmine.org/projects/redmine/wiki/Rest_Issues)
- [ADR 0007: 유닛 테스트 도구와 설정](./0007-unit-testing-tools-and-configs.md) 