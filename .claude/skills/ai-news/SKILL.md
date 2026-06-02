---
name: ai-news
description: 從多個來源平行抓取今日 AI 新聞，整合成結構化摘要報告。支援 arxiv / hn / industry / blogs 等來源過濾，--save 可自動存檔。
allowed-tools: WebFetch, WebSearch, Read, Write, Bash(date:*), Bash(mkdir:*)
argument-hint: [arxiv|hn|industry|blogs|all] [--save] [--brief]
---

抓取 AI 新聞。參數：$ARGUMENTS

參考 @sources.md 取得各來源 URL 和說明。

---

## 解析參數

- 若 `$ARGUMENTS` 包含 `arxiv` → 只抓 arXiv 論文
- 若 `$ARGUMENTS` 包含 `hn` → 只抓 Hacker News
- 若 `$ARGUMENTS` 包含 `industry` → 只抓產業媒體
- 若 `$ARGUMENTS` 包含 `blogs` → 只抓官方部落格
- 若無來源參數或包含 `all` → 抓所有來源
- `--brief` → 每來源只取 5 則
- `--save` → 完成後將報告寫入 `reports/YYYY-MM-DD.md`

---

## 抓取策略（平行執行）

針對每個需要抓取的來源，**同時啟動獨立子任務**：

### 來源 A：arXiv CS.AI + CS.LG
使用 WebFetch 抓取 https://arxiv.org/list/cs.AI/recent
擷取：論文標題、作者（前三位）、一句話摘要、arxiv 連結
取最新 10 篇（--brief 模式取 5 篇）

### 來源 B：Hacker News
使用 WebFetch 抓取 https://hn.algolia.com/api/v1/search?tags=story&query=AI&numericFilters=points%3E50&hitsPerPage=10
擷取：標題、分數、留言數、連結
過濾：只保留與 AI/LLM/ML 相關的討論

### 來源 C：產業媒體
使用 WebSearch 搜尋「AI news today site:techcrunch.com OR site:theverge.com OR site:wired.com」
擷取：標題、來源、發布時間、一句話摘要

### 來源 D：官方部落格
依序 WebFetch 以下頁面，取最新 3 則公告：
- https://www.anthropic.com/news
- https://openai.com/news/
- https://deepmind.google/discover/blog/

---

## 整合輸出格式

收集所有來源結果後，整合成以下格式輸出：

```
# AI 新聞摘要 — {今日日期}
> 來源：{實際抓到的來源清單} | 生成時間：{時間}

---

## 🔬 研究論文（arXiv）

| 論文 | 作者 | 重點 |
|------|------|------|
| [標題](連結) | 作者 et al. | 一句話摘要 |

---

## 🏭 產業動態

- **[標題](連結)** `TechCrunch` — 摘要
- **[標題](連結)** `The Verge` — 摘要

---

## 💬 社群討論（Hacker News）

- [標題](連結) — ▲ 分數 · 留言數則留言

---

## 📢 官方公告

- **[標題](連結)** `Anthropic/OpenAI/DeepMind` — 摘要

---

## 🔑 今日關鍵趨勢

（從所有來源中提煉 3-5 個重複出現的主題或趨勢，用一句話描述每個）
```

---

## 儲存報告（--save）

若參數包含 `--save`：
1. 取得今日日期：`date +%Y-%m-%d`
2. 確保目錄存在：`mkdir -p reports`
3. 將完整報告寫入 `reports/{日期}.md`
4. 輸出確認訊息：`報告已儲存至 reports/{日期}.md`
