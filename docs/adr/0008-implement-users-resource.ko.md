# Users 리소스 추가 구현

## 상태

승인됨 - 2025-01-06
완료됨 - 2025-01-06

## MCP 도구

없음

## 컨텍스트

ADR 0002에서 계획된 4개의 안정(Stable) 리소스(Issues, Projects, Users, Time Entries) 중 Users 리소스가 미구현된 것으로 확인되었습니다. 다음 상황을 고려해야 합니다:

1. 구현 필요성

   - README에 명시된 기능
   - Redmine REST API의 안정(Stable) 리소스(1.1~)로서의 위치
   - 다른 리소스와의 연계(프로젝트 멤버, 이슈 담당자 등)

2. 현재 과제

   - ADR 0003의 완료 목록에 Users 리소스가 포함되지 않음
   - 사용자 관련 타입 정의나 조작이 미구현
   - 기존 구현(Issues, Projects, Time Entries)과의 일관성 확보 필요

3. 기술적 제약
   - ADR 0004의 테스트 전략(GET 작업만 테스트)과의 일관성
   - ADR 0006의 모듈 분할 방침 준수
   - ADR 0007의 테스트 도구와 설정 활용

## 결정

다음 구현을 완료했습니다:

1. **파일 구조**

```
src/
├── lib/
│   ├── client/
│   │   ├── users.ts      # 신규 생성
│   │   └── index.ts      # 업데이트
│   └── types/
│       ├── users/        # 신규 생성
│       │   ├── schema.ts
│       │   └── types.ts
│       └── index.ts      # 업데이트
```

2. **API 구현 범위**

   - GET /users - 사용자 목록 조회
     - 상태 필터 대응
     - 이름 검색 대응
     - 그룹 필터 대응
   - GET /users/:id - 사용자 상세 조회
     - 멤버십 정보 조회 대응
     - 그룹 정보 조회 대응
   - API 클라이언트에 UsersClient 통합

3. **타입 정의와 스키마**
   - UserListParams, UserShowParams 정의
   - RedmineUser, RedmineUserLimited 정의
   - Zod 스키마 구현
   - 유효성 검사 기능 구현

4. **테스트 구현**
   - ADR 0004에 따라 GET 메서드 테스트 구현
   - 사용자 목록 조회 테스트
   - 사용자 상세 조회 테스트(include 대응)
   - 오류 케이스 테스트 완료

## 결과

### 긍정적인 결과

1. **기능의 완전성**
   - README와의 일관성 확보
   - 계획된 모든 안정(Stable) 리소스 구현 완료
   - 사용자 관련 기능 제공 시작

2. **유지보수성**
   - 기존 구현 패턴 준수
   - 일관된 코드 구조 유지
   - 테스트 용이성 확보

3. **확장성**
   - 향후 기능 확장 대응 용이
   - 다른 리소스와의 연계 강화 기반 확립

4. **테스트 커버리지**
   - GET 메서드에 대한 포괄적인 테스트 완료
   - 오류 케이스 검증 완료

### 부정적인 결과

1. **구현 제한**
   - GET 메서드만 테스트하는 품질 보증의 한계
   - 관리자 권한이 필요한 작업 취급

2. **개발 영향**
   - 코드 정리와 통합 필요
   - 새 기능 추가에 따른 리뷰 프로세스 증가

## 참고 자료

- [Redmine REST Users API](https://www.redmine.org/projects/redmine/wiki/Rest_Users)
- [ADR 0002: API 구현 기본 방침](./0002-api-implementation.ko.md)
- [ADR 0003: 모듈 분할](./0003-separate-modules.ko.md)
- [ADR 0004: 유닛 테스트 전략](./0004-unit-testing-strategy.ko.md)
- [ADR 0006: 모듈 분할](./0006-separate-client-and-types.ko.md)
- [ADR 0007: 유닛 테스트 도구와 설정](./0007-unit-testing-tools-and-configs.ko.md) 