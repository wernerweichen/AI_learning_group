# AI 新聞來源

## 研究論文

| 來源 | URL | 說明 |
|------|-----|------|
| arXiv CS.AI | https://arxiv.org/list/cs.AI/recent | 最新 AI 論文列表 |
| arXiv CS.LG | https://arxiv.org/list/cs.LG/recent | 機器學習論文 |
| arXiv CS.CL | https://arxiv.org/list/cs.CL/recent | 自然語言處理 |
| Papers With Code | https://paperswithcode.com/latest | 附代碼的論文 |
| Semantic Scholar | https://api.semanticscholar.org/graph/v1/paper/search?query=large+language+model&fields=title,abstract,year&limit=5 | 語意搜尋論文（JSON API）|

## 產業媒體（英文）

| 來源 | URL | 特色 |
|------|-----|------|
| TechCrunch AI | https://techcrunch.com/category/artificial-intelligence/ | 創業 / 融資新聞 |
| The Verge AI | https://www.theverge.com/ai-artificial-intelligence | 消費者 AI 產品 |
| Wired AI | https://www.wired.com/tag/artificial-intelligence/ | 深度分析 |
| MIT Tech Review | https://www.technologyreview.com/topic/artificial-intelligence/ | 學術導向 |
| VentureBeat AI | https://venturebeat.com/category/ai/ | 企業 AI 動態 |

## 社群討論

| 來源 | URL | API |
|------|-----|-----|
| Hacker News | https://news.ycombinator.com/ | https://hn.algolia.com/api/v1/search?tags=story&query=AI&numericFilters=points%3E50&hitsPerPage=10 |
| Reddit r/MachineLearning | https://www.reddit.com/r/MachineLearning/.json?limit=10 | JSON 直接可用 |
| Reddit r/artificial | https://www.reddit.com/r/artificial/.json?limit=10 | JSON 直接可用 |

## 官方部落格

| 來源 | URL | 更新頻率 |
|------|-----|----------|
| Anthropic | https://www.anthropic.com/news | 每週 |
| OpenAI | https://openai.com/news/ | 每週 |
| Google DeepMind | https://deepmind.google/discover/blog/ | 每週 |
| Meta AI | https://ai.meta.com/blog/ | 每月 |
| Mistral AI | https://mistral.ai/news/ | 不定期 |
| Hugging Face | https://huggingface.co/blog | 每週 |

## 中文來源

| 來源 | URL | 特色 |
|------|-----|------|
| 機器之心 | https://www.jiqizhixin.com/ | 頂級中文 AI 媒體 |
| 36Kr AI | https://36kr.com/information/AI/ | 創投 / 商業視角 |
| 量子位 | https://www.qbitai.com/ | 研究 + 產業 |

## 使用提示

- **快速模式**（`--brief`）：優先使用 HN API 和 arXiv，速度最快
- **深度模式**：加入 MIT Tech Review 和官方部落格
- **中文報告**：加入「機器之心」和「量子位」
- **JSON API**：HN API 和 Reddit JSON 不需要解析 HTML，速度更快且穩定
