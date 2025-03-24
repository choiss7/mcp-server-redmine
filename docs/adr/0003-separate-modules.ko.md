# 모듈 분할 및 디렉토리 구조 정리

## 상태

승인됨 - 2025-01-05
완료됨 - 2025-01-05

## 컨텍스트

MCP 서버 구현을 진행하는 과정에서 다음과 같은 상황에 직면했습니다:

1. 현재 구현 상황

   - `lib/`, `types.ts`, `config.ts`, `client.ts`는 구현 완료
   - `handlers.ts`를 구현 중이며, 다음과 같은 문제가 발생
     - 도구 정의가 증가함에 따라 파일 크기가 급속히 증가
     - 포맷 함수 추가로 코드가 더욱 비대해짐
     - 테스트가 작성하기 어려운 상태

2. 현재 문제점
   - `handlers.ts`의 구현이 400줄을 초과할 전망
   - 관련 기능(도구 정의, 포맷 함수)이 하나의 파일에 혼재
   - 각 도구의 테스트가 어려운 상태

## 결정

다음과 같은 디렉토리 구조로 변경하기로 결정했습니다:

```
src/
├── tools/                # 도구 정의
│   ├── issues.ts
│   ├── projects.ts
│   ├── time_entries.ts
│   └── index.ts
├── formatters/          # 포맷터
│   ├── issues.ts
│   ├── projects.ts
│   ├── time_entries.ts
│   └── index.ts
├── lib/                 # 구현 완료된 공통 라이브러리
│   ├── client.ts        # Redmine API 클라이언트
│   ├── config.ts        # 설정 관리
│   └── types.ts         # 타입 정의
├── handlers.ts          # 요청 핸들러
└── index.ts            # 엔트리포인트
```

### 1. 모듈 분할 방침

- 도구 정의(`tools/`)

  - Redmine의 각 리소스별로 파일 분할
  - 각 도구의 스키마와 입력 유효성 검사 포함
  - `index.ts`에서 모든 도구 내보내기

- 포맷터(`formatters/`)

  - 응답의 포맷 처리를 분리
  - 리소스별로 적절한 텍스트 형식으로 정리
  - 재사용 가능한 형태로 구현

- 핸들러(`handlers.ts`)
  - 도구 실행 제어에 특화
  - 오류 처리의 통일적인 구현
  - MCP 프로토콜에 따른 응답 생성

### 2. 모듈 간의 의존 관계

의존성 방향을 다음과 같이 제한:

```
handlers → tools → lib
       ↘        ↗
     formatters
```

## 결과

### 긍정적인 결과

- 구현 완료된 코드의 정리와 재사용성 향상
- 핸들러의 책임이 명확해짐
- 테스트가 작성하기 쉬운 구조로 개선
- 새로운 도구 추가가 용이해짐
- 포맷 처리의 일관성 확보

### 부정적인 결과

- 파일 수의 증가
- 마이그레이션 작업 필요
- 임포트 경로 관리 필요
- TypeScript 설정 변경 필요

### 적용 결과

이 ADR에 기반하여 다음 구현이 완료되었습니다:

1. 이슈 관련 기능

- 검색, 생성, 업데이트, 삭제

2. 프로젝트 관련 기능

- 검색, 상세 조회, 생성, 업데이트
- 아카이브/언아카이브, 삭제

3. 작업 시간 관련 기능

- 검색, 상세 조회, 생성, 업데이트, 삭제

모든 기능에 대해 도구 정의, 포맷터, 핸들러의 3가지 요소를 통한 구현이 완료되었습니다.

## 참조

- [Model Context Protocol servers](https://github.com/modelcontextprotocol/servers)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api)

핸들러 구현 관련 참고 자료:

- [MCP Tool Schema 정의](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/src/types.ts)
- [MCP 프로토콜 사양서](https://spec.modelcontextprotocol.io) 