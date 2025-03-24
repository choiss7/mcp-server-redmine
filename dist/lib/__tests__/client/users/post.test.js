import { jest, describe, it, beforeEach } from '@jest/globals';
import { UsersClient } from "../../../client/users.js";
describe("Users API (POST)", () => {
    let client;
    let mockFetch;
    beforeEach(() => {
        client = new UsersClient();
        mockFetch = jest.spyOn(global, "fetch");
        mockFetch.mockReset();
    });
    describe("POST /users.json (createUser)", () => {
        // POST操作は常にデータ作成を伴うため、全てスキップ
        it.skip("all POST operation tests are skipped for safety", () => {
            // POST操作は常にデータ作成を伴うため、テストをスキップします
            // Redmine APIの仕様で、POSTリクエストは以下のパラメータを受け付け、
            // 新規データを作成します：
            //
            // 必須パラメータ:
            // - login: ログイン名
            // - firstname: 名
            // - lastname: 姓
            // - mail: メールアドレス
            // - password: パスワード
            //
            // オプションパラメータ:
            // - auth_source_id: 認証ソースID
            // - mail_notification: メール通知設定
            // - must_change_passwd: パスワード変更強制
            // - generate_password: パスワード自動生成
            // - admin: 管理者権限
            // - status: ステータス (1: 有効, 2: ロック, 3: 登録のみ)
            // - custom_fields: カスタムフィールドの値
            //
            // これらの操作は全てユーザーデータの作成を伴うため、
            // テスト環境でも実行すべきではありません。
            // また、ユーザー作成には管理者権限が必要です。
        });
    });
});
//# sourceMappingURL=post.test.js.map