# 인스펙터 도구를 활용한 테스트 전략

## 상태

승인됨 - 2025-01-05
업데이트됨 - 2025-01-06
완료됨 - 2025-01-07

## 컨텍스트

Redmine용 MCP 서버의 구현이 다음 ADR을 거쳐 기본적인 형태를 갖추었습니다:

1. 프로젝트 기본 구조(0001)
2. API 구현(0002, 폐기됨)
3. 모듈 분할(0003)
4. 유닛 테스트 전략(0004)

구현한 코드의 동작 확인을 위해 MCP 공식 인스펙터 도구(@modelcontextprotocol/inspector)를 활용하는 것을 검토합니다.

## 결정

다음 접근 방식으로 인스펙터 도구를 활용합니다:

### 인스펙터를 사용한 테스트 흐름

1. 빌드 프로세스

```bash
# TypeScript 빌드
npm run build

# 실행 권한 부여
# 인스펙터 도구가 명령어로 빌드된 파일을 실행하기 때문에
# 실행 권한이 필요합니다
chmod +x dist/index.js

# 인스펙터 실행
npx @modelcontextprotocol/inspector dist/index.js
```

2. 테스트 항목

- 서버 연결 테스트

  - 환경 변수 설정
  - 프로토콜 협상
  - 오류 처리

- 도구 기능 테스트(Issues)

  - 목록 조회
  - 상세 조회
  - 생성
  - 업데이트
  - 삭제

- 도구 기능 테스트(Projects)

  - 목록 조회
  - 상세 조회
  - 생성
  - 업데이트
  - 아카이브/언아카이브
  - 삭제

- 도구 기능 테스트(Time Entries)
  - 목록 조회
  - 상세 조회
  - 생성
  - 업데이트
  - 삭제

3. 오류 패턴 테스트

- 유효하지 않은 API 키
- 유효하지 않은 호스트 URL
- 필수 파라미터 누락
- 유효성 검사 오류
- 존재하지 않는 리소스 접근

### 테스트 환경 준비

1. 테스트용 Redmine 서버

   - 테스트용 프로젝트
   - 테스트용 사용자
   - 테스트용 API 키

2. 환경 변수 설정

```bash
export REDMINE_API_KEY="test_api_key"
export REDMINE_HOST="http://test.redmine.local"
```

### 테스트 범위

ADR 0004(유닛 테스트 전략)에 따라 데이터 변경을 수반하지 않는 GET 작업만 테스트 대상으로 합니다.

#### 테스트 대상 도구

1. **Issues**

   - `search_issues`: 이슈 검색
   - 기타 도구(생성·업데이트·삭제)는 테스트 대상 제외

2. **Projects**

   - `search_projects`: 프로젝트 검색
   - `get_project`: 프로젝트 상세 조회
   - 기타 도구(생성·업데이트·아카이브·삭제)는 테스트 대상 제외

3. **Time Entries**

   - `search_time_entries`: 작업 시간 검색
   - `get_time_entry`: 작업 시간 상세 조회
   - 기타 도구(생성·업데이트·삭제)는 테스트 대상 제외

4. **Users**
   - `search_users`: 사용자 검색
   - `get_user`: 사용자 상세 정보 조회

이 방침으로 다음과 같은 이점을 얻을 수 있습니다:

- 테스트 실행으로 인한 실제 데이터 영향을 완전히 방지
- 읽기 작업의 완전성 확인
- 운영 환경에서 안전한 테스트 실행 가능

## 구현 및 개선

### 2025-01-06 업데이트

1. **초기 설정 개선**

   - 실행 권한 자동 부여 관련 문제 식별
   - 빌드 프로세스에 `chmod +x dist/index.js` 추가
   - 테스트 절차 업데이트

2. **프로젝트 검색 수정**

   - `ProjectQuerySchema`에 `query` 파라미터 추가
   - 검색 기능 버그 수정

3. **국제화 대응**
   - 도구 설명을 영어로 변경(issues.ts, projects.ts, time_entries.ts)

### 테스트 실시 기록

초기 테스트에서 다음 문제 발견:

1. 실행 권한 문제

   - 증상: `EACCES` 오류
   - 원인: 빌드 파일에 실행 권한 없음
   - 해결: `chmod +x dist/index.js` 추가

2. 프로젝트 검색 문제
   - 증상: 검색 키워드 작동 안 함
   - 원인: 쿼리 파라미터 미구현
   - 해결: 스키마 수정 및 구현 추가

## 결과

### 긍정적인 결과

- 엔드투엔드 동작 확인 가능
- 실제 Redmine API와 연동 확인
- 대화형 테스트 가능
- 오류 상황의 즉각적인 피드백
- 코드 문제 조기 발견
- 권한 문제를 포함한 실행 환경 차이 발견 가능

### 부정적인 결과

- 테스트용 Redmine 서버 준비 필요
- 수동 테스트로 인한 재현성 문제
- 테스트 결과의 기록·관리 필요
- 자동화가 어려운 부분 존재
- 실행 환경에 따른 권한 설정 차이 주의 필요

## 주의 사항

1. **빌드 파일의 실행 권한**

   - MCP 인스펙터는 빌드된 JavaScript 파일을 명령어로 실행합니다
   - `chmod +x dist/index.js`로 실행 권한 부여가 필요합니다
   - 이 설정은 Git에서 추적되지 않으므로 새로 클론할 때나 CI 환경에서는 반드시 실행해야 합니다

2. **영어화**
   - 도구 정의 설명문을 영어로 변경했습니다(2025-01-06)

## 도구 목록

### Issues (`src/tools/issues.ts`)

| 도구            | 상수                | 설명                                                                                                                       |
| --------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `search_issues` | `ISSUE_SEARCH_TOOL` | Redmine 이슈 검색<br>- 이슈 ID, 프로젝트 ID, 상태, 담당자 등으로 필터링<br>- 키워드 전체 텍스트 검색<br>- 최대 100개 조회 |
| `create_issue`  | `ISSUE_CREATE_TOOL` | 새 이슈 생성<br>- 프로젝트 ID와 제목 필수<br>- 트래커, 상태, 우선순위 지정 가능<br>- 사용자 정의 필드 값 지원           |
| `update_issue`  | `ISSUE_UPDATE_TOOL` | 기존 이슈 업데이트<br>- 이슈 ID 필수<br>- 업데이트할 필드만 지정<br>- 댓글 추가 가능                                     |
| `delete_issue`  | `ISSUE_DELETE_TOOL` | 이슈 삭제<br>- 이슈 ID 지정<br>- 이 작업은 취소할 수 없음                                                               |

### Projects (`src/tools/projects.ts`)

| 도구                | 상수                     | 설명                                                                                                                |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `search_projects`   | `PROJECT_SEARCH_TOOL`    | Redmine 프로젝트 검색<br>- 이름 또는 ID로 검색<br>- 상태별 필터링<br>- 최대 100개 프로젝트 조회                    |
| `get_project`       | `PROJECT_GET_TOOL`       | 프로젝트 상세 정보 조회<br>- 프로젝트 ID(숫자) 또는 식별자(문자열) 지정<br>- 트래커 및 카테고리와 같은 관련 정보 포함 가능 |
| `create_project`    | `PROJECT_CREATE_TOOL`    | 새 프로젝트 생성<br>- 이름과 식별자 필수<br>- 상위 프로젝트 지정 가능<br>- 모듈 및 트래커 구성               |
| `update_project`    | `PROJECT_UPDATE_TOOL`    | 기존 프로젝트 업데이트<br>- 프로젝트 ID(숫자) 또는 식별자(문자열) 지정<br>- 업데이트할 필드만 지정             |
| `archive_project`   | `PROJECT_ARCHIVE_TOOL`   | 프로젝트 아카이브<br>- 프로젝트 ID(숫자) 또는 식별자(문자열) 지정<br>- 아카이브된 프로젝트는 편집 불가        |
| `unarchive_project` | `PROJECT_UNARCHIVE_TOOL` | 아카이브된 프로젝트 복원<br>- 프로젝트 ID(숫자) 또는 식별자(문자열) 지정<br>- 언아카이브 후 프로젝트 편집 가능 |
| `delete_project`    | `PROJECT_DELETE_TOOL`    | 프로젝트 삭제<br>- 프로젝트 ID(숫자) 또는 식별자(문자열) 지정<br>- 이 작업은 취소할 수 없음<br>- 하위 프로젝트도 함께 삭제 |

### Time Entries (`src/tools/time_entries.ts`)

| 도구                  | 상수                     | 설명                                                                                                      |
| --------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `search_time_entries` | `TIME_ENTRY_SEARCH_TOOL` | 작업 시간 검색<br>- 사용자 ID, 프로젝트 ID, 날짜로 필터링<br>- 날짜 범위 내 검색<br>- 최대 100개 항목 조회 |
| `get_time_entry`      | `TIME_ENTRY_GET_TOOL`    | 작업 시간 상세 정보 조회<br>- ID로 단일 작업 시간 항목 조회                                          |
| `create_time_entry`   | `TIME_ENTRY_CREATE_TOOL` | 새 작업 시간 생성<br>- 프로젝트 ID 또는 이슈 ID 필수<br>- 시간 및 활동 ID 필수<br>- 사용자 정의 필드 값 지원 |
| `update_time_entry`   | `TIME_ENTRY_UPDATE_TOOL` | 기존 작업 시간 업데이트<br>- ID로 단일 작업 시간 항목 업데이트<br>- 업데이트할 필드만 지정<br>- 프로젝트 변경 불가 |
| `delete_time_entry`   | `TIME_ENTRY_DELETE_TOOL` | 작업 시간 삭제<br>- ID로 단일 작업 시간 항목 삭제<br>- 이 작업은 취소할 수 없음                     |

### Users (`src/tools/users.ts`)

| 도구           | 상수               | 설명            |
| -------------- | ------------------ | --------------- |
| `search_users` | `USER_SEARCH_TOOL` | 사용자 검색     |
| `get_user`     | `USER_GET_TOOL`    | 사용자 상세 정보 조회 |

## 참고 자료

- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Inspector Documentation](https://modelcontextprotocol.io/docs/tools/inspector)
- [Redmine API Documentation](https://www.redmine.org/projects/redmine/wiki/Rest_api)
- [ADR 0004: 유닛 테스트 전략](./0004-unit-testing-strategy.ko.md) 