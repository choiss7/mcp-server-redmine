# Redmine API 사양에 기반한 MCP 도구 재정의

## 상태

제안됨 - 2025-01-07

완료됨 - 2025-01-07

## 컨텍스트

현재 MCP 도구 구현이 Redmine REST API 사양과 완전히 일치하지 않는 문제가 발견되었습니다:

1. 명명 불일치

   - `search_`나 `get_`과 같은 명명이 API 명명 규칙과 다름
   - 리소스간 명명 규칙이 통일되지 않음

2. 파라미터의 불완전한 구현

   - 프로젝트 검색에서 API에 없는 파라미터를 정의
   - 많은 필터 옵션이 미구현
   - 포맷과 유효성 검증 정의가 불충분

3. 응답 형식의 불일치
   - include를 통한 관련 데이터 조회가 불완전
   - 반환 데이터 형식이 API와 다른 부분 존재

Redmine API 사양과 완전한 일관성을 가지도록 하고, 더 정확하고 사용하기 쉬운 도구로 만들 필요가 있습니다.

## 결정

### 1. 명명 규칙 통일

API 엔드포인트에 맞춰 명명을 통일:

- 목록 조회: `list_{resource}` 예) GET /issues -> `list_issues`
- 상세 조회: `show_{resource}` 예) GET /issues/1 -> `show_issue`
- 생성: `create_{resource}` 예) POST /issues -> `create_issue`
- 갱신: `update_{resource}` 예) PUT /issues/1 -> `update_issue`
- 삭제: `delete_{resource}` 예) DELETE /issues/1 -> `delete_issue`

### 2. 리소스와 도구 정의

각 리소스의 완전한 도구 세트:

1. Issues (이슈)

   - [x] list_issues
   - [x] show_issue
   - [x] create_issue
   - [x] update_issue
   - [x] delete_issue
   - [x] add_issue_watcher
   - [x] remove_issue_watcher

2. Projects (프로젝트)

   - [x] list_projects
   - [x] show_project
   - [x] create_project
   - [x] update_project
   - [x] delete_project
   - [x] archive_project
   - [x] unarchive_project

3. Time Entries (시간 기록)

   - [x] list_time_entries
   - [x] show_time_entry
   - [x] create_time_entry
   - [x] update_time_entry
   - [x] delete_time_entry

4. Users (사용자)
   - [x] list_users (관리자 권한 필요)
   - [x] show_user
   - [x] create_user (관리자 권한 필요)
   - [x] update_user (관리자 권한 필요)
   - [x] delete_user (관리자 권한 필요)

### 3. 파라미터 정의 표준화

#### 3.1 공통 파라미터

- 페이지네이션: `offset`, `limit`
- 관련 데이터 조회: `include` (콤마로 구분)
- 정렬: `sort` (컬럼명, `:desc`로 내림차순)

#### 3.2 리소스별 특정 파라미터

- ID 지정: 숫자 또는 문자열 (리소스에 따라 다름)
- 상태: 문자열 또는 숫자 (`open`, `closed`, `*` 등)
- 날짜: `YYYY-MM-DD` 형식
- 타임스탬프: `YYYY-MM-DDTHH:MM:SSZ` 형식

#### 3.3 커스텀 필드

- **필터 형식**: `cf_{field_id}`

  - `field_id`: 커스텀 필드 ID (숫자)
  - 예: `cf_1`, `cf_2`, `cf_3`

- **검색 연산자**:

  - 완전 일치: `cf_1=value`
  - 부분 일치: `cf_1=~value`
  - 기타 연산자는 URL 인코딩 필요

- **제약 사항**:
  - 필터링 가능한 필드만 사용 가능
  - 필드 ID는 사전에 확인 필요
  - 커스텀 필드는 "필터로 사용" 옵션이 활성화되어 있어야 함

### 4. 리소스별 구현 사양

#### 4.1 Issues (이슈)

- list_issues:
  - 커스텀 필드로 필터링 지원
  - 여러 `cf_{field_id}` 파라미터를 동시에 사용 가능

#### 4.2 Projects (프로젝트)

- list_projects:
  - 커스텀 필드 조회 지원
  - include=issue_custom_fields로 조회 가능

#### 4.3 Users (사용자)

- list_users:

  - 관리자 권한 필수

- show_user:

  - `/users/current`로 현재 사용자 정보 조회 가능
  - 권한에 따라 반환 필드가 다름:

    1. 비관리자가 잠금 해제된 사용자 조회 시:

       - firstname
       - lastname
       - mail
       - created_on

    2. 관리자가 잠금 해제된 사용자 조회 시:

       - firstname
       - lastname
       - created_on
       - last_login_on

    3. 자신의 정보 조회 시 추가 필드:

       - login
       - api_key

    4. 관리자가 다른 사용자 정보 조회 시 모든 정보:
       - api_key (2.3.0 이상)
       - status (2.4.0 이상)

  - include 파라미터로 선택적 필드:
    - memberships: 프로젝트 멤버십과 역할
    - groups: 그룹 멤버십 (2.1 이상)

- create_user, update_user, delete_user:
  - 관리자 권한 필수
  - create/update에서 비밀번호 생성 옵션 있음

## 결과

### 긍정적 결과

1. API 사양과의 일관성

   - 완전한 기능 세트 제공
   - 정확한 파라미터 처리
   - 표준적인 응답 형식

2. 사용성 향상

   - 일관된 명명 규칙
   - 명확한 파라미터 정의
   - 적절한 유효성 검증

3. 유지보수성 향상
   - 명확한 기능 범위
   - API 문서와의 일치성
   - 권한 요구사항 명시

### 부정적 결과

1. 후방 호환성 문제

   - 도구 이름 변경으로 인한 영향
   - 파라미터 사양 변경
   - 기존 코드 수정 필요성

2. 구현의 복잡화

   - 더 상세한 유효성 검증
   - 에러 처리 증가
   - 권한에 따른 응답 형식 분기

3. 이행 비용
   - 기존 구현의 개선
   - 테스트 업데이트
   - 문서 수정

## 참고 자료

- [Redmine REST API Issues](https://www.redmine.org/projects/redmine/wiki/Rest_Issues)
- [Redmine REST API Projects](https://www.redmine.org/projects/redmine/wiki/Rest_Projects)
- [Redmine REST API Time Entries](https://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries)
- [Redmine REST API Users](https://www.redmine.org/projects/redmine/wiki/Rest_Users)
- [Redmine REST API Custom Fields](https://www.redmine.org/projects/redmine/wiki/Rest_api#Working-with-custom-fields) 