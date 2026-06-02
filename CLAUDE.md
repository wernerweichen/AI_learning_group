# CLAUDE.md — AI News Aggregator

## 專案概述

使用 Claude Code CLI 從多個來源**平行抓取** AI 新聞，整合成每日摘要報告。
本檔案同時作為 Claude Code 所有功能的實戰示範。

---

## 技術棧

- **Runtime**: Claude Code CLI (`claude` 指令)
- **MCP**: `@modelcontextprotocol/server-fetch`（網頁擷取）、`@modelcontextprotocol/server-brave-search`（搜尋）
- **Skills**: `ai-news`（平行多來源抓取）、`summarize`（精煉報告）
- **Hooks**: 抓取完成後自動存檔到 `reports/`

---

## 快速開始

```bash
# 1. 設定 MCP servers（只需一次）
claude mcp add fetch -- npx -y @modelcontextprotocol/server-fetch
claude mcp add brave-search -- npx -y @modelcontextprotocol/server-brave-search

# 2. 互動模式執行新聞抓取
claude
/ai-news

# 3. 非互動模式（適合排程）
claude -p "fetch today's AI news and save report" --dangerously-skip-permissions
```

---

## 可用 Skills（Slash Commands）

| 指令 | 說明 | 觸發方式 |
|------|------|----------|
| `/ai-news` | 抓取今日所有來源的 AI 新聞 | 手動 / 自動 |
| `/ai-news arxiv` | 只抓 arXiv 論文 | 手動 |
| `/ai-news hn` | 只抓 Hacker News 討論 | 手動 |
| `/ai-news --save` | 抓取並存成 `reports/YYYY-MM-DD.md` | 手動 |
| `/ai-news --brief` | 每來源只回傳 3 則，快速瀏覽 | 手動 |

---

## MCP 整合說明

`.mcp.json` 定義了兩個 server，commit 進 git 讓整個團隊共用：

- **fetch**: 直接抓取任意網頁 HTML/JSON → 用於 arXiv、部落格
- **brave-search**: 語意搜尋最新新聞 → 用於即時產業動態

```bash
# 確認已連線
claude mcp list

# 在互動模式中直接使用 MCP 工具
/mcp__fetch__fetch url=https://arxiv.org/list/cs.AI/recent
```

---

## Subagent 架構

`/ai-news` skill 會派出 **4 個平行 subagent**，各自負責一個來源，
最後由主 agent 整合報告。

```
主 agent (/ai-news)
├── subagent-1: arXiv (Explore 型，唯讀)
├── subagent-2: Hacker News (Explore 型，唯讀)
├── subagent-3: 產業媒體 (Explore 型，唯讀)
└── subagent-4: 官方部落格 (Explore 型，唯讀)
         └── 整合 → reports/YYYY-MM-DD.md
```

好處：
- **Context 隔離**：每個 subagent 有獨立 context window，不互相污染
- **速度**：平行抓取比序列快 3-4 倍
- **容錯**：單一來源失敗不影響其他來源

---

## Hooks 設定

`.claude/hooks.json` 定義兩個生命週期事件：

1. **PreToolUse + WebFetch** → 記錄每次抓取的 URL
2. **PostToolUse + Write** → 新報告儲存時顯示通知

---

## 目錄結構

```
.
├── CLAUDE.md                        ← 本文件（專案記憶，自動載入）
├── .mcp.json                        ← MCP server 設定（進 git）
├── .claude/
│   ├── hooks.json                   ← 生命週期 hooks
│   └── skills/
│       └── ai-news/
│           ├── SKILL.md             ← /ai-news 指令定義
│           └── sources.md           ← 新聞來源列表（@引用）
├── reports/                         ← 自動儲存的日報（不進 git）
│   └── 2026-06-02.md
└── src/                             ← Vite 教學網站原始碼
```

---

## CLI 參數速查（本專案常用）

```bash
# 指定模型：用 opus 做深度分析，haiku 做快速摘要
claude -p "/ai-news" --model haiku            # 快
claude -p "/ai-news arxiv --save" --model opus # 精

# CI / 排程模式（無互動提示）
claude -p "run /ai-news --save" --dangerously-skip-permissions

# 查看 context 用量（長時間運行後確認）
# 在互動模式中：
# /context
# /compact retain news sources and report format
```

---

## Context 管理策略

- 執行新聞任務前先 `/clear`（切換任務）
- 長時間使用後 `/compact retain report structure and sources`
- 每個 subagent 使用 `context: fork`，自動隔離 context

---

## 常見問題

**WebFetch 被防火牆封鎖**
→ 改用 `brave-search` MCP 取得摘要，不直接抓 HTML。

**arXiv 回傳過多結果**
→ 在 skill 內加入 `--brief` 參數，限制每來源最多 5 則。

**報告沒有自動儲存**
→ 確認執行時加了 `--save` 參數，或 hooks.json 路徑正確。

**MCP server 連線失敗**
→ `claude mcp list` 確認狀態，重新執行 `claude mcp add` 指令。
