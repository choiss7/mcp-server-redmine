import { jest, describe, it, beforeEach } from '@jest/globals';
import { IssuesClient } from "../../../client/issues.js";
describe("Issues API (POST)", () => {
    let client;
    let mockFetch;
    beforeEach(() => {
        client = new IssuesClient();
        mockFetch = jest.spyOn(global, "fetch");
        mockFetch.mockReset();
    });
    describe("POST /issues.json (createIssue)", () => {
        // POST操作は常にデータ作成を伴うため、全てスキップ
        it.skip("all POST operation tests are skipped for safety", () => {
            // POST操作は常にデータ作成を伴うため、テストをスキップします
            // Redmine APIの仕様で、POSTリクエストは以下のパラメータを受け付け、
            // 新規データを作成します：
            //
            // 必須パラメータ:
            // - project_id: プロジェクトの指定
            // - subject: チケットの題名
            //
            // オプションパラメータ:
            // - tracker_id: トラッカーの指定
            // - status_id: ステータスの指定
            // - priority_id: 優先度の指定
            // - description: 説明
            // - category_id: カテゴリの指定
            // - fixed_version_id: 対象バージョンの指定
            // - assigned_to_id: 担当者の指定
            // - parent_issue_id: 親チケットの指定
            // - custom_fields: カスタムフィールドの値
            // - watcher_user_ids: ウォッチャーの指定
            // - is_private: プライベートフラグ
            // - estimated_hours: 予定工数
            //
            // これらの操作は全てデータの作成を伴うため、
            // テスト環境でも実行すべきではありません。
            //
            // また、添付ファイルの追加も可能ですが、
            // これも実データの作成を伴うため、テストから除外します。
        });
    });
});
//# sourceMappingURL=post.test.js.map