# Session Summary — Claude Code Tutorial Site + AI News Tool
**Date**: 2026-06-02  
**Repo**: `wernerweichen/AI_learning_group`  
**Branch**: `claude/session-OuyZ6`

---

## 概覽

本次 session 完成了兩件事：
1. 將 Claude Code 工程師教學 React 頁面部署到 GitHub Pages
2. 建立完整的 AI 新聞抓取工具（CLAUDE.md + Skills + MCP + Hooks）

---

## Step 1：建立 Vite React 專案

**輸入素材**
- `claudecodetutorial.jsx` — 互動式教學頁面（5 個章節，含 sidebar 導覽）
- `CLAUDE1.md` — 部署指引（技術棧、步驟、常見問題）

**執行動作**
```bash
npm create vite@latest . -- --template react
npm install
```

**關鍵設定**
- `src/App.jsx` ← 替換為教學頁面內容
- `src/main.jsx` ← 移除 `import './index.css'`（已刪除 CSS 檔案）
- `index.html` ← 修改 `<title>` 為 `Claude Code 工程師教學`
- `vite.config.js` ← 設定 `base: '/AI_learning_group/'`
- `package.json` ← 新增 `predeploy` / `deploy` scripts

---

## Step 2：設定 GitHub Actions 自動部署

建立 `.github/workflows/deploy.yml`，在 push 到 `main` 時自動觸發：

```
push to main
  → vite build (生成 dist/)
  → peaceiris/actions-gh-pages 推送到 gh-pages branch
  → GitHub Pages 服務靜態檔案
```

**部署結果**
- `gh-pages` branch 自動建立
- 兩個 workflow 都執行成功（`conclusion: success`）

---

## Step 3：修復空白頁面

**症狀**：`https://wernerweichen.github.io/AI_learning_group/` 載入後頁面全空白

**根本原因**：`vite.config.js` 原本設定了 `base: '/ai_learning_group/'`（全小寫），
但 GitHub 倉庫名稱為 `AI_learning_group`（大小寫混合）。

GitHub Pages 部署在 Linux 伺服器，路徑**大小寫敏感**。
瀏覽器請求 `/ai_learning_group/assets/index.js` → 404 → React 無法掛載 → 空白頁面。

```html
<!-- 修復前（錯誤） -->
<script src="/ai_learning_group/assets/index-xjv3xHuw.js"></script>

<!-- 修復後（正確） -->
<script src="/AI_learning_group/assets/index-xjv3xHuw.js"></script>
```

**修復步驟**
1. 更新 `vite.config.js`：`base: '/AI_learning_group/'`
2. 重新 build，確認 `dist/index.html` 路徑正確
3. Commit + push → GitHub Actions 重新部署

**驗證方式**：透過 GitHub MCP 直接讀取 `gh-pages` branch 的 `index.html`，確認路徑正確後告知使用者做 `Ctrl+Shift+R` 強制重整。

---

## Step 4：建立 AI 新聞抓取工具

建立完整的 Claude Code 功能示範套件，涵蓋教學頁面中提到的所有功能：

### 檔案結構

```
AI_learning_group/
├── CLAUDE.md                          ← 專案記憶（自動載入）
├── .mcp.json                          ← MCP server 設定
├── .claude/
│   ├── hooks.json                     ← 生命週期 hooks
│   └── skills/
│       └── ai-news/
│           ├── SKILL.md               ← /ai-news 指令定義
│           └── sources.md             ← 新聞來源清單
└── reports/                           ← 自動儲存的日報
```

### 各功能對應說明

| 功能 | 對應檔案 | 說明 |
|------|----------|------|
| **CLAUDE.md** | `CLAUDE.md` | 專案架構、常用指令、MCP 設定方式、context 管理策略 |
| **CLI Flags** | `CLAUDE.md` 說明區塊 | `--model`, `--dangerously-skip-permissions`, `--save` 範例 |
| **Slash Command** | `.claude/skills/ai-news/SKILL.md` | `/ai-news` 可帶參數：`arxiv`, `hn`, `--save`, `--brief` |
| **MCP 整合** | `.mcp.json` | `fetch` server（抓網頁）+ `brave-search`（語意搜尋） |
| **Subagents** | `SKILL.md` 平行抓取章節 | 4 個平行子任務：arXiv / HN / 產業媒體 / 官方部落格 |
| **Hooks** | `.claude/hooks.json` | `PreToolUse(WebFetch)` + `PostToolUse(Write)` 自動 log |
| **@引用** | `SKILL.md` 中的 `@sources.md` | Skill 引用外部來源列表，保持 SKILL.md 簡潔 |

### `/ai-news` Skill 抓取架構

```
使用者執行 /ai-news [參數]
│
├── 平行子任務 A：WebFetch arXiv CS.AI/CS.LG → 最新論文
├── 平行子任務 B：WebFetch HN Algolia API → 高分 AI 討論
├── 平行子任務 C：WebSearch 產業媒體 → TechCrunch / Verge / Wired
└── 平行子任務 D：WebFetch 官方部落格 → Anthropic / OpenAI / DeepMind
         │
         └── 整合 → 輸出結構化報告（研究 / 產業 / 社群 / 公告 / 趨勢）
                  └── --save → 寫入 reports/YYYY-MM-DD.md
```

---

## 技術決策紀錄

| 決策 | 選擇 | 原因 |
|------|------|------|
| 部署方式 | GitHub Actions + peaceiris/actions-gh-pages | 比 `npm run deploy` 更可靠，不需本地 credentials |
| Skill 設計 | 單一 SKILL.md + @sources.md | 分離「行為定義」和「資料」，便於更新來源不改 Skill 邏輯 |
| 新聞來源 | HN Algolia API + Reddit JSON API | JSON API 比解析 HTML 快且穩定，不受 anti-scraping 限制 |
| Hooks 格式 | `activity.log` 記錄 | 非侵入性，只記錄不阻擋，方便 debug |

---

## 使用方式（供日後參考）

```bash
# 進入專案
cd AI_learning_group

# 第一次：設定 MCP
claude mcp add fetch -- npx -y @modelcontextprotocol/server-fetch
claude mcp add brave-search -- npx -y @modelcontextprotocol/server-brave-search

# 啟動互動模式
claude

# 在互動模式中執行
/ai-news               # 所有來源，完整報告
/ai-news arxiv         # 只抓 arXiv 論文
/ai-news hn --brief    # HN 快速版（5 則）
/ai-news --save        # 抓完存成 reports/YYYY-MM-DD.md

# 非互動模式（排程 / CI 使用）
claude -p "/ai-news --save" --model haiku --dangerously-skip-permissions
```

---

## 最終交付物

| 項目 | 狀態 | 連結 |
|------|------|------|
| GitHub Pages 網站 | ✅ 上線 | https://wernerweichen.github.io/AI_learning_group/ |
| Vite 原始碼 | ✅ 已推送 | `main` branch |
| CLAUDE.md | ✅ 已推送 | `claude/session-OuyZ6` branch |
| AI News Skill | ✅ 已推送 | `.claude/skills/ai-news/` |
| MCP 設定 | ✅ 已推送 | `.mcp.json` |
| Hooks 設定 | ✅ 已推送 | `.claude/hooks.json` |
