# MCP SDK 구현으로 마이그레이션

## 상태

제안됨 - 2025-01-12

채택됨 - 2025-01-13

## 컨텍스트

현재 프로젝트는 MCP 서버 기능을 구현하기 위해 자체 코드를 작성하고 있습니다. 이 접근 방식은 다음과 같은 몇 가지 문제가 있습니다:

1. 중복 코드: MCP 프로토콜 관련 기능을 우리 자체적으로 구현하고 있습니다.
2. 표준 부합 유지 비용: MCP 프로토콜이 업데이트되면 자체 구현을 수동으로 업데이트해야 합니다.
3. 일관성 부족: 우리의 구현이 MCP 표준 또는 다른 MCP 프로젝트와 일치하지 않을 수 있습니다.

최근 공식 MCP SDK(`@modelcontextprotocol/sdk`)가 출시되어 MCP 서버 개발을 용이하게 하고 여러 구현 간의 일관성을 보장할 수 있게 되었습니다.

## 결정

기존 자체 MCP 서버 구현에서 공식 `@modelcontextprotocol/sdk` 라이브러리로 마이그레이션하기로 결정했습니다. 이 마이그레이션은 다음과 같은 변경 사항을 포함합니다:

1. `@modelcontextprotocol/sdk` 패키지를 프로젝트 의존성으로 추가
2. 자체 MCP 프로토콜 관련 코드를 SDK의 기능으로 대체
3. 기존 핸들러를 SDK의 구조에 맞게 조정
4. 프로젝트 구조와 테스트를 업데이트하여 새로운 의존성을 반영

## 파일 변경 계획

### 1. 패키지 의존성 업데이트

```json
// package.json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.1.0",
    "zod": "^3.23.8" // 유지
  }
}
```

### 2. 엔트리 포인트 수정

```typescript
// src/index.ts
import { StdioServerTransport } from "@modelcontextprotocol/sdk";
import { getTools } from "./tools/index.js";
import { createHandlers } from "./handlers/index.js";

// SDK의 서버 초기화 코드로 대체
const transport = new StdioServerTransport();
const handlers = createHandlers(); // 기존 핸들러를 SDK 형식에 맞게 조정
const tools = getTools();

transport.registerTools(tools);
transport.registerHandlers(handlers);
transport.start();
```

### 3. 핸들러 수정

```typescript
// src/handlers/index.ts
import { ToolCallHandler } from "@modelcontextprotocol/sdk/types.js";
import { issueHandler } from "./issues.js";
import { projectHandler } from "./projects.js";
import { timeEntryHandler } from "./time_entries.js";
import { userHandler } from "./users.js";

// 핸들러를 SDK 형식으로 조정
export function createHandlers(): Record<string, ToolCallHandler> {
  return {
    ...issueHandler,
    ...projectHandler,
    ...timeEntryHandler,
    ...userHandler,
  };
}
```

### 4. 도구 정의 수정

```typescript
// src/tools/index.ts
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as issueTools from "./issues.js";
import * as projectTools from "./projects.js";
import * as timeEntryTools from "./time_entries.js";
import * as userTools from "./users.js";

// 도구를 SDK의 Tool 타입에 맞게 조정
export function getTools(): Tool[] {
  return [
    ...Object.values(issueTools),
    ...Object.values(projectTools),
    ...Object.values(timeEntryTools),
    ...Object.values(userTools),
  ];
}
```

## 결과

### 긍정적인 결과

1. **표준 준수**: 공식 SDK를 사용하여 MCP 프로토콜 표준을 자동으로 준수
2. **유지보수 감소**: 프로토콜 업데이트가 SDK에 반영되면 의존성 업데이트만으로 적용 가능
3. **코드 중복 제거**: MCP 프로토콜 로직을 직접 구현할 필요 없음
4. **안정성 향상**: 공식 SDK는 광범위하게 테스트되고 사용됨
5. **생태계 일관성**: 다른 MCP 도구들과 일관된 동작 보장
6. **기능 확장**: SDK에서 제공하는 추가 기능 활용 가능

### 부정적인 결과

1. **외부 의존성**: 새로운 외부 의존성 도입으로 인한 위험
2. **마이그레이션 비용**: 기존 코드를 SDK에 맞게 수정하는 작업 필요
3. **학습 곡선**: 팀이 새로운 SDK 사용법을 배워야 함
4. **제한된 유연성**: 특수한 요구사항에 대해 SDK가 제한적일 수 있음

## 구현 단계

1. SDK 패키지 설치
2. 코어 MCP 로직(서버, 메시지 처리 등)을 SDK 구현으로 교체
3. 기존 도구 정의와 핸들러를 SDK 형식에 맞게 조정
4. 구성 및 환경 설정을 SDK 요구사항에 맞게 업데이트
5. 단위 테스트 업데이트 및 확인
6. 통합 테스트를 통한 기능 검증

## 참고 자료

- [MCP SDK 문서](https://github.com/modelcontextprotocol/sdk)
- [MCP 프로토콜 사양](https://github.com/modelcontextprotocol/protocol) 