# 프로젝트 기본 구조

## 상태

승인됨 - 2025-01-05

## MCP 도구

이 ADR에서는 도구를 정의하지 않습니다.

## 컨텍스트

Redmine의 MCP 서버를 구현하기 위해 프로젝트의 기본 구조와 설정을 결정할 필요가 있습니다.
참고로, 다음과 같은 기존 구현을 검토했습니다:

- MCP TypeScript SDK(패키지 설정과 TypeScript 설정의 기반으로)
- Brave Search MCP Server(디렉토리 구조의 기반으로)

주요 고려 사항:

- MCP 서버의 표준적인 구현 패턴과의 일관성
- TypeScript/Node.js 프로젝트로서의 현대적인 설정
- 코드의 유지보수성과 테스트 용이성
- 향후 기능 확장에 대한 대응

## 결정

다음과 같은 기본 설정과 디렉토리 구조를 채택하기로 결정했습니다.

### 디렉토리 구조

```
.
├── README.ja.md
├── dist/            # 컴파일된 파일용
├── docs/
│   └── adr/        # 아키텍처 결정 기록
├── src/
│   ├── index.ts    # 메인 엔트리포인트
│   ├── handlers.ts # MCP 요청 핸들러
│   ├── client.ts   # Redmine API 클라이언트
│   ├── types.ts    # 타입 정의
│   └── config.ts   # 설정
├── package.json    # 프로젝트 설정
└── tsconfig.json   # TypeScript 설정
```

### 패키지 설정(package.json)

주요 설정 항목:

- type: "module" - ES Modules 사용
- engines: "node": ">=18" - Node.js v18 이상 요구
- dependencies:
  - @modelcontextprotocol/sdk: "^1.1.0" - 최신 MCP SDK 사용
  - zod: 유효성 검사용
- devDependencies:
  - typescript: ^5.5.4
  - tsx: 개발 시 실행 환경
  - jest: 테스트 프레임워크
- scripts:
  - build: TypeScript 빌드
  - dev: 개발용 서버(tsx 사용)
  - test: Jest를 통한 테스트 실행
  - lint: ESLint를 통한 정적 분석

### TypeScript 설정(tsconfig.json)

주요 설정 항목:

- target: "es2018" - 비교적 최신 JavaScript 기능 사용 가능
- module: "Node16" - 최신 모듈 시스템
- declaration: true - 타입 정의 파일 생성
- strict: true - 엄격한 타입 체크
- isolatedModules: true - 단일 파일에서의 타입 체크 보장
- 기타 빌드 최적화 옵션

## 결과

### 긍정적인 결과

- 단순하고 이해하기 쉬운 구조
- 관심사 분리가 적절히 이루어짐
- 다른 MCP 서버 구현과의 일관성
- 기능 단위로 파일 분할을 통한 유지보수성 향상
- 현대적인 TypeScript/Node.js 프로젝트 관행을 따른 설정
- 개발 경험 향상(tsx, ESLint, Jest)

### 부정적인 결과

- 파일 수가 증가할 경우 관리의 복잡성 증가
- 복잡한 기능을 추가할 때 디렉토리 구조 검토가 필요할 가능성
- 개발 환경 설정이 다소 복잡해짐

## 참고 자료

- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - 패키지 설정과 TypeScript 설정의 기반
  - [package.json](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/package.json)
  - [tsconfig.json](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/tsconfig.json) 