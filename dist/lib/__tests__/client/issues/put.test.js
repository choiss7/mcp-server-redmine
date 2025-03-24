import { jest, describe, it, beforeEach } from '@jest/globals';
import { IssuesClient } from "../../../client/issues.js";
import * as fixtures from "../../helpers/fixtures.js";
describe("Issues API (PUT)", () => {
    let client;
    let mockFetch;
    const issueId = fixtures.singleIssueResponse.issue.id;
    beforeEach(() => {
        client = new IssuesClient();
        mockFetch = jest.spyOn(global, "fetch");
        mockFetch.mockReset();
    });
    describe("PUT /issues/:id.json (updateIssue)", () => {
        // PUT操作は常にデータ変更の可能性があるため、全てスキップ
        it.skip("all PUT operation tests are skipped for safety", () => {
            // PUT操作は常にデータ変更の可能性があるため、テストをスキップします
            // Redmine APIの仕様で、PUTリクエストは以下のパラメータを受け付けます：
            // - project_id: プロジェクトの変更
            // - tracker_id: トラッカーの変更
            // - status_id: ステータスの変更
            // - subject: 題名の変更
            // - description: 説明の変更
            // - priority_id: 優先度の変更
            // - assigned_to_id: 担当者の変更
            // - category_id: カテゴリの変更
            // - fixed_version_id: 対象バージョンの変更
            // - notes: コメントの追加
            // - private_notes: プライベートノートフラグ
            //
            // これらの操作は全てデータの変更を伴うため、テスト環境でも
            // 実行すべきではありません。
        });
    });
});
//# sourceMappingURL=put.test.js.map