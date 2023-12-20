# 相教 - 技能交換平台

## 目錄

- [相教 - 技能交換平台](#相教---技能交換平台)
  - [目錄](#目錄)
  - [專案概述](#專案概述)
  - [功能特色](#功能特色)
    - [會員系統](#會員系統)
    - [技能交換](#技能交換)
    - [通訊系統](#通訊系統)
    - [管理系統](#管理系統)
  - [技術棧與系統分析](#技術棧與系統分析)
    - [技術棧](#技術棧)
    - [數據庫設計](#數據庫設計)
    - [正規化分析](#正規化分析)
  - [檔案架構](#檔案架構)
  - [系統實作](#系統實作)
    - [資料庫建置](#資料庫建置)
    - [重要功能及 SQL 指令](#重要功能及-sql-指令)
    - [SQL 指令效能優化](#sql-指令效能優化)
    - [交易管理與併行控制](#交易管理與併行控制)
  - [啟動專案](#啟動專案)
    - [安裝 Dependencies](#安裝-dependencies)
    - [環境變量設置](#環境變量設置)
    - [數據庫配置](#數據庫配置)
    - [OAuth 第三方驗證啟用](#oauth-第三方驗證啟用)
    - [啟動服務器](#啟動服務器)
  - [外部連結](#外部連結)
    - [GitHub Repo](#github-repo)
    - [展示影片連結](#展示影片連結)

## 專案概述

「相教」是一個專為各種技能愛好者打造的社群平台，旨在讓用戶能夠輕鬆地分享專業知識，同時學習新技能。本平台分為會員系統、技能交換、通訊系統、管理系統四大部分，提供用戶豐富多元的互動體驗。

## 功能特色

### 會員系統

- **註冊與登入**：使用 Google OAuth 進行身份驗證，保障用戶隱私。
- **個人資料管理**：用戶可管理個人資料及發布過的卡片。
- **身份驗證申請**：提交身份驗證文件，提高發布卡片的可信度。

### 技能交換

- **創建與瀏覽卡片**：用戶可創建卡片，選擇想學習的技能標籤，並瀏覽其他用戶的卡片。
- **卡片互動**：對感興趣的卡片進行按讚、留言等互動。

### 通訊系統

- **私人對話**：與卡片發布者進行私人對話，討論技能交換的細節。
- **對話紀錄瀏覽**：查看過往的對話記錄。

### 管理系統

- **內容管理**：管理員可管理卡片、用戶及主題標籤。
- **身份驗證管理**：審核用戶的身份驗證申請。

## 技術棧與系統分析

### 技術棧

- **前後端框架**：使用全端框架 Next.js，結合 React 和 Node.js 的特性。
- **ORM 套件**：使用 Drizzle-orm，支持交易管理和併行控制，降低 SQL 注入風險。
- **UI 框架**：採用 TailwindCSS 和 Shadcn 套件，提升用戶界面體驗。

### 數據庫設計

- **ER Diagram**：包含五個強實體（USERS, CARDS, TOPICS, LABELS, LOCATIONS）和一個弱實體（APPLICATIONS）。
- **關聯數據庫模式**：共有十四個關聯，如 USERS、CARDS、MESSAGES 等。
- **數據字典**：詳細描述每個資料表的欄位資訊。

### 正規化分析

- **1NF 到 4NF**：所有關聯均滿足從第一正規化到第四正規化的要求。

## 檔案架構

```
banana-next/
├── .env.example
├── .eslintrc.json
├── README.md
├── components.json
├── docker-compose.yml
├── drizzle.config.ts
├── next.config.js
├── nextauth.d.ts
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public/
│   ├── (skipped)
├── src/
│   ├── actions.ts
│   ├── actions/
│   │   ├── adminActions.ts
│   │   ├── cardActions.ts
│   │   ├── cards.json
│   │   ├── chatActions.ts
│   │   ├── comment.json
│   │   ├── locations.json
│   │   ├── topics.json
│   │   ├── types.ts
│   │   ├── user.json
│   │   ├── userActions.ts
│   │   └── users.json
│   ├── app/
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── manage/
│   │   │   │   ├── delete-label-form.tsx
│   │   │   │   ├── delete-topic-form.tsx
│   │   │   │   ├── insert-label-form.tsx
│   │   │   │   ├── insert-topic-form.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── review/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── review-item.tsx
│   │   │   │   ├── review-list.tsx
│   │   │   │   ├── review-skeleton.tsx
│   │   │   │   ├── review-tab-list.tsx
│   │   │   │   └── search.tsx
│   │   │   └── users/
│   │   │       ├── page.tsx
│   │   │       ├── search.tsx
│   │   │       ├── user-item.tsx
│   │   │       ├── user-list.tsx
│   │   │       ├── user-skeleton.tsx
│   │   │       └── user-tab-list.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   ├── application/
│   │   │   ├── application-form.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── progress.tsx
│   │   ├── card-list.tsx
│   │   ├── card-skeleton.tsx
│   │   ├── chat/
│   │   │   ├── [user_id]/
│   │   │   │   ├── chat-box.tsx
│   │   │   │   ├── message-form.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── chat-nav-pane.tsx
│   │   │   ├── conversation-item.tsx
│   │   │   ├── conversation-list.tsx
│   │   │   ├── conversation-skeleton.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── messages.tsx
│   │   │   ├── page.tsx
│   │   │   └── search.tsx
│   │   ├── create/
│   │   │   ├── create-form.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── page_old.tsx
│   │   │   └── progress.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── location-item.tsx
│   │   ├── locations-accordion.tsx
│   │   ├── navbar.tsx
│   │   ├── page.tsx
│   │   ├── profile/
│   │   │   ├── [user_id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── profile-cards.tsx
│   │   │   │   ├── profile-edit.tsx
│   │   │   │   ├── profile-info.tsx
│   │   │   │   └── profileClient.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── sidebar.tsx
│   │   ├── topic-item.tsx
│   │   └── topics-accordion.tsx
│   ├── components/
│   │   ├── avatar.tsx
│   │   ├── skill-card/
│   │   │   ├── comment-section.tsx
│   │   │   ├── control.tsx
│   │   │   ├── footer.tsx
│   │   │   └── skill-card.tsx
│   │   └── ui/ (imported from shadcn)
│   │       └── (skipped)
│   ├── db/
│   │   ├── exampledata_card.json
│   │   ├── exampledata_chat.json
│   │   ├── index.ts
│   │   ├── messages.json
│   │   ├── schema.ts
│   │   ├── types.ts
│   │   └── users.json
│   ├── lib/
│   │   ├── session.ts
│   │   └── utils.ts
│   └── validators/
│       └── auth.ts
├── tailwind.config.js
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## 系統實作

### 資料庫建置

- **資料生成**：使用 [fakenamegenerator.com](https://www.fakenamegenerator.com/) 生成用戶資料，並根據主要表格隨機生成其他資料。

### 重要功能及 SQL 指令

- **用戶功能**：包括新增卡片、查詢卡片、過濾卡片等。
- **管理員功能**：如增加學校選項、查看身份認證狀態等。

### SQL 指令效能優化

- **索引建立**：對特定欄位建立索引，顯著提升查詢效率。

### 交易管理與併行控制

- **交易管理**：使用 Drizzle-orm 的 TRANSACTION 功能進行交易管理。
- **併行控制**：確保多用戶操作時數據的一致性和穩定性。

## 啟動專案

### 安裝 Dependencies

1.  安裝專案所需的 Dependencies。在專案根目錄下打開終端機，執行以下命令：

```bash
yarn
```

### 環境變量設置

2. 創建一個名為 `.env.local` 的文件在專案的根目錄中，並添加 `.env.example` 文件中的變量。這些環境變量對於專案的運行至關重要。

### 數據庫配置

3. 啟動數據庫：

   - 使用 Docker 啟動 Postgres 資料庫：
     ```bash
     docker compose up -d
     ```
   - 或者，您可以在 pgAdmin4 中托管一個 PostgreSQL 數據庫。

4. 將資料庫連線 URL 填入 .env.local，格式為 `postgres://<username>:<password>@localhost:<port>/<database-name>`。

5. 執行遷移：
   - 執行以下命令以設置數據庫配置：
     ```bash
     yarn migrate
     ```

### OAuth 第三方驗證啟用

6. 登入 [Google Cloud Console](https://console.cloud.google.com/).
7. 創建 Google Cloud Platform (GCP) 專案
8. 在控制台頂部導航欄中，選擇或創建一個新的 GCP 專案。
9. 在專案儀表板中，點擊「導航菜單」（左上角的三條橫線）。
10. 選擇「API 與服務」>「啟用 API 與服務」，並選擇「OAuth 同意畫面」。
11. 選擇用戶類型（通常為「外部」）並點擊「創建」。
12. 填寫應用程序名稱、用戶支持電子郵件、開發者聯繫信息等。
13. 在「授權的網域」填寫 `http://localhost:3000/`
14. 完成配置後，點擊「保存並繼續」。
15. 在「API 與服務」儀表板中，選擇「憑證」，點擊「創建憑證」，選擇「OAuth 用戶端 ID」。
16. 應用程序類型選擇「Web 應用程序」。
17. 在「已授權的 JavaScript 來源」中填寫 `http://localhost:3000/`。
18. 在「已授權的重定向 URI」中填寫 `http://localhost:3000/api/auth/callback/google`。
19. 點擊「創建」，系統將生成您的用戶端 ID 和用戶端密鑰。
20. 更新 .env.local 文件

根據 `.env.example` 文件的格式，將您的用戶端 ID 和用戶端密鑰添加到 `.env.local` 文件中。

```
GOOGLE_CLIENT_ID=您的用戶端ID
GOOGLE_CLIENT_SECRET=您的用戶端密鑰
```

### 啟動服務器

21. 最後，啟動開發服務器：

```bash
yarn dev
```

完成以上步驟後，您的專案應該已經成功運行在本地開發服務器上。

## 外部連結

### GitHub Repo

[相教 - 技能交換平台](https://github.com/112-1-DB-Group-10/banana-next)

### 展示影片連結

[點擊觀看](https://youtu.be/lADQbZCNkQU)
