# MCPレスポンスバリデーションの実装

## ステータス

破棄 - 2025-01-09 - より良い実装方針が決定されたため（ADR 0013参照）

## コンテキスト

現在のプロジェクトには2つのバリデーション層があります：

1. Redmine APIのバリデーション
   - RedmineのAPIリクエストとレスポンスの検証
   - カスタムスキーマ定義（`src/lib/types/`）
   - zodによる型チェック

2. MCPプロトコルのバリデーション（実装中）
   - MCPプロトコル仕様への準拠検証が必要
   - `@modelcontextprotocol/sdk/types.js`のスキーマを使用
   - レスポンスがMCPプロトコルに準拠しているかの検証

主な考慮点：
- 2つのバリデーション層の明確な分離
- MCPプロトコル仕様への厳密な準拠
- パフォーマンスへの影響
- エラーハンドリングの整理

## 破棄の理由

このアプローチは以下の理由により破棄されました：

1. 独自のバリデーション実装の複雑性
   - カスタムバリデーターの実装と維持が必要
   - エラーハンドリングの重複実装
   - テストの複雑化

2. MCPのSDKを十分に活用できていない
   - SDKに組み込まれているバリデーション機能の未使用
   - 実装の重複

3. より良いアプローチの発見
   - ADR 0013でSDKを活用する新しい実装方針を決定
   - プロトコル準拠の簡素化が可能
   - テストの簡素化が可能

## 学んだ教訓

1. 既存のライブラリやツールの活用
   - 独自実装の前に既存のソリューションを十分に調査する
   - SDKやライブラリの機能を最大限活用する

2. 実装の簡素化
   - 複雑なバリデーション層の追加は避ける
   - 既存の機能を活用して実装をシンプルに保つ

3. 早期のフィードバック
   - 実装の複雑化に早めに気付くことの重要性
   - 方針転換の判断を迅速に行う

## 代替案

新しい実装方針については [ADR 0013: SDKの活用による実装の標準化](./0013-sdk-implementation.md) を参照してください。

## 参考資料

- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Model Context Protocol仕様書](https://spec.modelcontextprotocol.io)
- [ADR 0013: SDKの活用による実装の標準化](./0013-sdk-implementation.md)
