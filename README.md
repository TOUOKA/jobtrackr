# 🗂️ JobTrackr - 求人選考管理＆プロフィール管理アプリ

**JobTrackr** は、転職活動中の求職者向けに以下の機能を提供する学習用Webアプリです：
- **選考管理（カンバン方式）**
- **プロフィール管理**
- **AI職務経歴書自動生成**

---

## 🖼️ 現在の特徴

- **選考管理（カンバン表示）**
  - ステータス：エントリー検討 → 書類選考 → カジュアル面談 → 技術試験 → 1次面接 → 2次面接 → 最終面接 → オファー面談
  - カードはドラッグ＆ドロップで簡単移動（Sortable.js使用）
  - 求人タイトル／会社名／URL／エントリー日を保存
  - Firebase Firestore に自動保存・復元（ユーザー認証にGoogleログイン使用）

- **プロフィール管理ページ（profile.html）**
  - 氏名・希望職種・スキル職務要約などを入力・保存
  - Firebase Firestore に保存し、ログインユーザーごとに復元可能

- **AI職務経歴書生成**
  - 求人カードに「職務経歴書を生成」ボタンを追加
  - OpenAI API（gpt-3.5-turbo）を使って下書きを生成
  - 生成結果はWebページに表示され、手動で保存やコピーが可能

---

## 🏗️ 使用技術

- HTML / Vanilla JavaScript
- [Tailwind CSS](https://tailwindcss.com/)（CDN利用）
- [Firebase Authentication](https://firebase.google.com/docs/auth)（Googleログイン）
- [Firebase Firestore](https://firebase.google.com/docs/firestore)（データ保存）
- [Sortable.js](https://sortablejs.github.io/Sortable/)（ドラッグ＆ドロップ）
- [OpenAI API](https://platform.openai.com/)（職務経歴書生成）

---

## 🚀 セットアップ手順（ローカル開発用）

1. リポジトリをクローン：
   ```bash
   git clone https://github.com/TOUOKA/jobtrackr.git
   cd jobtrackr
   ```

2. Firebaseでプロジェクトを作成し、`index.html`・`profile.html` 中の `firebaseConfig` を上書きしてください。

3. OpenAI APIキーを取得し、`script.js` の該当箇所に貼り付け：

   ```js
   Authorization: "Bearer YOUR_API_KEY_HERE"
   ```

4. ブラウザで `index.html` または `profile.html` を開いて動作確認。

   - `Live Server`拡張で自動リロードが便利です。

---

## 🔐 セキュリティ上の注意

- APIキーは **公開リポジトリに載せないでください**。
- 本番利用の際は Firestore のセキュリティルールを設定し、バリデーションを行ってください。
- OpenAI API利用分は無料枠終了後、自己負担になります。

---

## 🧭 ディレクトリ／ファイル構成

```
jobtrackr/
├ index.html         # カンバン選考管理ページ
├ profile.html       # プロフィール管理ページ
├ script.js          # 選考管理ロジック＋AI連携
├ profile.js         # プロフィール編集ロジック
└ README.md          # プロジェクトの説明（このファイル）
```

---

## 🔮 今後の拡張案

- 面接予定のカレンダー連携／通知機能
- 職務経歴書PDF出力
- 求人スクレイピングで自動取り込み
- 面接メモ欄を追加して時系列で管理
- JSON／CSVエクスポート機能

---

## 👤 制作者

- **TOUOKA**（Twitter: [@your_twitter](https://twitter.com/your_twitter)）  
  はじめてのWeb開発・Firebase・AI連携に挑戦した記録です。

---

## 📝 ライセンス

MIT License
