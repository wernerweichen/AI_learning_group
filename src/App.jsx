import { useState } from "react";

const sections = [
  {
    id: "intro",
    label: "CLI vs 其他介面",
    icon: "⚡",
  },
  {
    id: "commands",
    label: "重要指令",
    icon: "⌨",
  },
  {
    id: "claudemd",
    label: "CLAUDE.md",
    icon: "📄",
  },
  {
    id: "ecosystem",
    label: "MCP · Skill · Agent",
    icon: "🧩",
  },
  {
    id: "workflow",
    label: "建立工作流",
    icon: "🔁",
  },
];

const CodeBlock = ({ code, lang = "" }) => (
  <pre
    style={{
      background: "#0d0d0d",
      border: "1px solid #2a2a2a",
      borderRadius: "6px",
      padding: "16px 20px",
      overflowX: "auto",
      fontSize: "13px",
      lineHeight: "1.7",
      color: "#c9d1d9",
      margin: "12px 0",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    }}
  >
    <code>{code}</code>
  </pre>
);

const Tag = ({ children, color = "#e8500a" }) => (
  <span
    style={{
      display: "inline-block",
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: "4px",
      padding: "1px 8px",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      marginRight: "6px",
    }}
  >
    {children}
  </span>
);

const Card = ({ children, accent = false }) => (
  <div
    style={{
      background: accent ? "#e8500a0a" : "#111",
      border: `1px solid ${accent ? "#e8500a44" : "#222"}`,
      borderRadius: "8px",
      padding: "20px 24px",
      marginBottom: "16px",
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2
    style={{
      fontSize: "22px",
      fontWeight: 800,
      color: "#f0f0f0",
      marginBottom: "6px",
      marginTop: "0",
      letterSpacing: "-0.02em",
      fontFamily: "'Space Grotesk', sans-serif",
    }}
  >
    {children}
  </h2>
);

const Sub = ({ children }) => (
  <h3
    style={{
      fontSize: "15px",
      fontWeight: 700,
      color: "#e8500a",
      marginBottom: "8px",
      marginTop: "24px",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontSize: "12px",
    }}
  >
    {children}
  </h3>
);

const P = ({ children }) => (
  <p
    style={{
      color: "#aaa",
      lineHeight: "1.75",
      marginBottom: "12px",
      marginTop: "0",
      fontSize: "14px",
    }}
  >
    {children}
  </p>
);

const Hl = ({ children }) => (
  <span style={{ color: "#f0f0f0", fontWeight: 600 }}>{children}</span>
);

const Divider = () => (
  <div
    style={{ borderTop: "1px solid #1e1e1e", margin: "28px 0" }}
  />
);

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: "auto", marginBottom: "16px" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                textAlign: "left",
                padding: "8px 14px",
                background: "#161616",
                color: "#888",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: "11px",
                borderBottom: "1px solid #222",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
            {row.map((cell, j) => (
              <td
                key={j}
                style={{
                  padding: "9px 14px",
                  color: j === 0 ? "#e8500a" : "#bbb",
                  fontFamily: j === 0 ? "'JetBrains Mono', monospace" : "inherit",
                  fontSize: j === 0 ? "12.5px" : "13px",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sections_content = {
  intro: () => (
    <div>
      <SectionTitle>CLI 與其他介面的核心差異</SectionTitle>
      <P>
        如果你已經用過 Claude.ai 或 API，CLI（即 Claude Code）感覺會很熟悉，但它的設計哲學完全不同——它是一個{" "}
        <Hl>以 agent 為中心的自動化框架</Hl>，而不是對話工具。
      </P>

      <Sub>三種介面的定位比較</Sub>
      <Table
        headers={["介面", "設計定位", "最適合的場景"]}
        rows={[
          ["Claude.ai / Web", "對話式 AI", "brainstorm、問答、單次任務"],
          ["API", "程式整合", "嵌入產品、批次處理、客製化流程"],
          ["Claude Code (CLI)", "Agentic 自動化框架", "長時間多步驟工程任務、CI/CD、代碼庫操作"],
        ]}
      />

      <Sub>CLI 的關鍵差異</Sub>

      <Card accent>
        <div style={{ display: "grid", gap: "16px" }}>
          {[
            {
              title: "直接存取檔案系統與 shell",
              desc: "CLI 可以讀寫你的整個代碼庫、執行指令、跑測試——不需要你 copy-paste。",
            },
            {
              title: "Persistent context 透過 CLAUDE.md",
              desc: "每次啟動自動載入專案記憶，不需要每次重新解釋架構。",
            },
            {
              title: "Multi-agent 協作",
              desc: "可以同時派出多個 subagent 平行處理，例如一個跑安全審查、一個跑測試生成。",
            },
            {
              title: "MCP 生態系整合",
              desc: "透過 MCP 協定連接 GitHub、資料庫、Slack 等 300+ 外部服務，全部用自然語言操控。",
            },
            {
              title: "Hooks 自動化觸發",
              desc: "定義生命週期事件（如存檔後、commit 前），讓 Claude 自動反應，不需手動觸發。",
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "#e8500a22",
                  color: "#e8500a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div style={{ color: "#f0f0f0", fontWeight: 600, fontSize: "14px", marginBottom: "3px" }}>
                  {item.title}
                </div>
                <div style={{ color: "#888", fontSize: "13px", lineHeight: "1.6" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Sub>安裝</Sub>
      <CodeBlock code={`# 需要 Node.js 18+
npm install -g @anthropic-ai/claude-code

# 驗證安裝
claude --version

# 啟動互動模式（在你的專案目錄下）
cd your-project
claude`} />

      <P>
        CLI 支援 macOS、Linux、WSL，以及 VS Code / JetBrains 擴充套件。也可在 claude.ai/code 的 Web 版使用。
      </P>
    </div>
  ),

  commands: () => (
    <div>
      <SectionTitle>重要指令速查</SectionTitle>
      <P>
        Claude Code 的指令分為三層：<Hl>CLI flags</Hl>（啟動時）、<Hl>Slash commands</Hl>（互動中）、<Hl>鍵盤快捷鍵</Hl>。
      </P>

      <Sub>CLI Flags（啟動參數）</Sub>
      <Table
        headers={["指令", "說明"]}
        rows={[
          ["claude", "啟動互動模式"],
          ["claude -p \"<prompt>\"", "非互動模式，直接執行任務後退出"],
          ["claude --model opus", "指定模型（opus / sonnet / haiku）"],
          ["claude --no-tools", "停用所有工具（純對話）"],
          ["claude --dangerously-skip-permissions", "跳過所有確認（適合 CI）"],
          ["claude mcp add <name> <cmd>", "新增 MCP server"],
          ["claude mcp list", "列出已設定的 MCP servers"],
        ]}
      />

      <Sub>核心 Slash Commands（互動模式內）</Sub>
      <Table
        headers={["指令", "類型", "說明"]}
        rows={[
          ["/help", "內建", "列出所有可用指令"],
          ["/clear", "內建", "清空當前對話（切換任務用）"],
          ["/compact [說明]", "內建", "壓縮 context，保留關鍵資訊（超過 80% 時使用）"],
          ["/context", "內建", "查看 context window 使用量"],
          ["/permissions", "內建", "設定工具的允許規則"],
          ["/mcp", "內建", "管理 MCP servers"],
          ["/agents", "內建", "管理 subagents"],
          ["/code-review", "Skill", "觸發代碼審查 workflow"],
          ["/workflows", "Workflow", "列出可用的動態 workflow（並行多 agent）"],
          ["/effort [level]", "內建", "設定推理力度（low / medium / high / xhigh）"],
        ]}
      />

      <Sub>鍵盤快捷鍵</Sub>
      <Table
        headers={["快捷鍵", "說明"]}
        rows={[
          ["Ctrl + C", "中斷當前任務"],
          ["Ctrl + L", "清除畫面"],
          ["↑ / ↓", "歷史指令"],
          ["Tab", "自動補全 slash command"],
          ["Shift + Enter", "多行輸入"],
        ]}
      />

      <Sub>實用範例</Sub>
      <CodeBlock code={`# 非互動模式：直接重構一個 function
claude -p "把 src/utils/auth.ts 的 validateToken 函數改成 async/await"

# 快速 code review
claude -p "review src/ 目錄的安全性問題" --model opus

# CI 模式（無確認提示）
claude -p "跑測試並修復失敗的 test case" --dangerously-skip-permissions`} />

      <Card accent>
        <div style={{ color: "#e8500a", fontWeight: 700, fontSize: "12px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Context 管理策略
        </div>
        <P>
          用 <code style={{ color: "#e8500a" }}>/compact</code> 當 context 超過 80%，用{" "}
          <code style={{ color: "#e8500a" }}>/clear</code> 當你切換到完全不同的任務。
          壓縮時可指定要保留的資訊：<code style={{ color: "#ccc" }}>/compact retain the error handling patterns</code>
        </P>
      </Card>
    </div>
  ),

  claudemd: () => (
    <div>
      <SectionTitle>CLAUDE.md：給 Claude 的專案記憶</SectionTitle>
      <P>
        CLAUDE.md 是 Claude 每次啟動時自動載入的 Markdown 檔案。它是你的{" "}
        <Hl>專案長期記憶</Hl>——架構慣例、常用指令、技術棧說明，不需要每次重新解釋。
      </P>

      <Sub>載入層級（由高到低覆蓋）</Sub>
      <CodeBlock code={`# 1. Enterprise CLAUDE.md（組織層）
# 2. ~/.claude/CLAUDE.md（個人全域）
# 3. ./CLAUDE.md（專案根目錄）← 最常用
# 4. ./src/components/CLAUDE.md（子目錄，當操作對應檔案時自動載入）

# 個人設定不進 git：
# CLAUDE.local.md（被 .gitignore，個人偏好）
# ~/.claude/rules/（把全域規則拆成多個檔案）`} />

      <Sub>CLAUDE.md 應該包含什麼</Sub>
      <Table
        headers={["類型", "內容範例"]}
        rows={[
          ["開發指令", "npm run dev / build / test / lint 的用法"],
          ["架構說明", "monorepo 結構、module 邊界、資料流向"],
          ["編碼規範", "命名慣例、型別要求、禁止的 pattern"],
          ["外部服務", "API endpoint、環境變數說明"],
          ["常見 gotcha", "不能改動的 legacy 部分、特殊 build 流程"],
        ]}
      />

      <Sub>範例：一個 Next.js 專案的 CLAUDE.md</Sub>
      <CodeBlock code={`# CLAUDE.md

## 技術棧
- Next.js 15 (App Router), TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- tRPC for API layer

## 開發指令
\`\`\`bash
npm run dev      # localhost:3000
npm run db:push  # 同步 Prisma schema
npm run test     # vitest
npm run lint     # eslint + tsc
\`\`\`

## 架構規範
- Server Components 優先，Client Components 加 "use client"
- API 路由只透過 tRPC，不直接呼叫 fetch
- 資料庫操作放在 src/server/db/，不進 components

## 禁止事項
- 不使用 any，改用 unknown + type guard
- 不直接修改 prisma/migrations/，使用 db:push

## 環境變數
- DATABASE_URL, NEXTAUTH_SECRET 必須存在（見 .env.example）`} />

      <Sub>子目錄 CLAUDE.md 的妙用</Sub>
      <P>
        當 Claude 操作特定目錄的檔案時，會自動載入該目錄的 CLAUDE.md。這讓你可以{" "}
        <Hl>針對不同模組給出不同的上下文</Hl>，而不是把所有東西塞在根目錄。
      </P>
      <CodeBlock code={`# src/components/CLAUDE.md
## Component 規範
- Props 必須有 JSDoc 說明
- 使用 compound component pattern（不傳 render props）
- 每個 component 附對應的 .stories.tsx

# src/api/CLAUDE.md  
## API 規範
- 所有 endpoint 需要 zod validation
- Error response 統一格式：{ error: string, code: number }`} />
    </div>
  ),

  ecosystem: () => (
    <div>
      <SectionTitle>MCP · Skill · Agent 生態系</SectionTitle>
      <P>
        這三個概念是 Claude Code 的核心擴充機制，層層疊加構成強大的自動化能力。
      </P>

      <Sub>MCP（Model Context Protocol）— 連接外部世界</Sub>
      <P>
        MCP 是標準化的 AI 工具整合協定，讓 Claude 可以操控{" "}
        <Hl>GitHub、資料庫、Slack、Jira 等 300+ 服務</Hl>，全部用自然語言。
      </P>
      <CodeBlock code={`# 新增 MCP server
claude mcp add github -- npx -y @modelcontextprotocol/server-github
claude mcp add playwright npx @playwright/mcp@latest

# 使用（自動出現為 slash command）
/mcp__github__create-pr
/mcp__playwright__create-test

# 查看已連接的 servers
claude mcp list

# 設定保存在 .mcp.json（可 commit 進 git 讓整個團隊共用）
git add .mcp.json`} />

      <Card>
        <div style={{ color: "#f0f0f0", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>
          MCP 的本質差異
        </div>
        <P>
          沒有 MCP：Claude 只能讀檔案、執行 bash。<br />
          有 MCP：Claude 可以查 production DB、開 PR、查 Sentry 錯誤、寫 Jira ticket——
          全在同一個對話裡，無需切換工具。
        </P>
      </Card>

      <Divider />

      <Sub>Skills — 可重用的行為模組</Sub>
      <P>
        Skills 是放在 <code style={{ color: "#e8500a" }}>.claude/skills/</code> 的資料夾，包含一個{" "}
        <code style={{ color: "#e8500a" }}>SKILL.md</code>。它定義可重用的行為，自動成為 slash command，
        也可由 Claude 根據任務上下文自動觸發。
      </P>

      <CodeBlock code={`# 目錄結構
.claude/
  skills/
    deploy/
      SKILL.md
    code-review/
      SKILL.md
      review-checklist.md   # 可被 @引用
    deep-research/
      SKILL.md`} />

      <CodeBlock code={`# .claude/skills/code-review/SKILL.md
---
name: code-review
description: 對本次修改進行安全性、效能與可維護性審查
allowed-tools: Read, Grep, Glob, Bash(git diff:*)
argument-hint: [file-or-directory]
---

針對 $ARGUMENTS 進行代碼審查：

1. 安全性漏洞（OWASP Top 10）
2. 效能問題（N+1 query、不必要的 re-render）
3. 代碼品質與可維護性
4. 測試覆蓋率

@review-checklist.md`} />

      <CodeBlock code={`# 只有使用者可觸發的 deploy skill（Claude 不會自動跑）
---
name: deploy
description: 部署到 production
disable-model-invocation: true
allowed-tools: Bash(npm:*), Bash(git:*)
---

部署流程：
1. 跑 npm test（失敗則停止）
2. npm run build
3. git push origin main`} />

      <CodeBlock code={`# 在 subagent 中執行的研究 skill
---
name: deep-research
description: 深入研究代碼庫中的某個主題
context: fork          # 在獨立 context 中執行
agent: Explore         # 使用 Explore 型 subagent
allowed-tools: Read, Grep, Glob
---

深入研究 $ARGUMENTS，分析相關檔案並總結發現。`} />

      <P>
        Skills 的 frontmatter 關鍵欄位：
      </P>
      <Table
        headers={["欄位", "說明"]}
        rows={[
          ["name", "Slash command 名稱"],
          ["description", "Claude 用來判斷是否自動觸發"],
          ["disable-model-invocation", "true → 只能手動觸發"],
          ["user-invocable: false", "隱藏在 / 選單（純背景知識）"],
          ["context: fork", "在獨立 subagent context 執行"],
          ["allowed-tools", "預先授權的工具（不需每次確認）"],
          ["model", "指定模型（haiku/sonnet/opus）"],
        ]}
      />

      <Divider />

      <Sub>Subagents — 平行處理與 context 隔離</Sub>
      <P>
        Subagent 是有自己 system prompt、工具限制和獨立 context window 的 AI 實體。
        用來<Hl>防止 context 污染</Hl>，並支援平行執行。
      </P>

      <CodeBlock code={`# .claude/skills/security-auditor/SKILL.md
---
name: security-auditor
description: 分析代碼的安全漏洞
context: fork
agent: general-purpose
model: sonnet
allowed-tools: Read, Grep, Bash(npm audit:*)
---

你是專注安全的代碼審查員。

分析 $ARGUMENTS 的：
- XSS / SQL Injection / CSRF 漏洞
- 依賴套件安全性（npm audit）
- 認證與授權邏輯
- 輸入驗證

回報格式：Critical / High / Medium / Low`} />

      <P>
        Claude 內建三種 subagent 類型：<Hl>Explore</Hl>（唯讀探索）、<Hl>Plan</Hl>（規劃）、
        <Hl>general-purpose</Hl>（完整能力）。設定 <code style={{ color: "#e8500a" }}>isolation: worktree</code>{" "}
        可給每個 subagent 獨立的 git worktree，讓多個 agent 同時修改檔案而不衝突。
      </P>
    </div>
  ),

  workflow: () => (
    <div>
      <SectionTitle>建立工程師的工作流</SectionTitle>
      <P>
        把 CLAUDE.md、Skills、MCP、Subagents 組合起來，就能建立完整的自動化工作流。
        以下是幾個實戰模式。
      </P>

      <Sub>模式一：Feature 完整開發循環</Sub>
      <P>
        從需求到 PR，一條 workflow 串起來。
      </P>

      <CodeBlock code={`# .claude/skills/feature/SKILL.md
---
name: feature
description: 完整的 feature 開發流程
disable-model-invocation: true
allowed-tools: Read, Write, Bash(git:*), Bash(npm:*)
argument-hint: <feature-description>
---

開發 feature：$ARGUMENTS

流程：
1. 建立 feature branch（git checkout -b feature/$ARGUMENTS）
2. 分析相關代碼（閱讀現有實作）
3. 實作功能（遵循 CLAUDE.md 的架構規範）
4. 撰寫測試（覆蓋主要 edge case）
5. 跑 npm test（確保全部通過）
6. npm run lint（修復所有 lint 錯誤）
7. commit（使用 conventional commit 格式）
8. 輸出 PR description 草稿`} />

      <Sub>模式二：平行 Code Review</Sub>
      <P>
        同時派出多個 subagent 分別負責不同面向的審查。
      </P>

      <CodeBlock code={`# CLAUDE.md 中定義的工作流說明

在 code review 時，派出以下平行任務：
- /security-auditor 分析安全漏洞
- /performance-checker 找效能瓶頸
- /test-coverage 評估測試覆蓋

最後整合三份報告輸出統一的 review comment`} />

      <Sub>模式三：Hooks 自動化觸發</Sub>
      <P>
        Hooks 讓 Claude 在特定生命週期事件後自動執行，不需手動觸發。
      </P>

      <CodeBlock code={`# .claude/hooks.json
{
  "hooks": [
    {
      "event": "PostToolUse",
      "tool": "Write",
      "command": "npm run lint --fix $FILE"
    },
    {
      "event": "PreToolUse",
      "tool": "Bash",
      "filter": "git commit",
      "command": "npm test"
    }
  ]
}`} />

      <Sub>模式四：CI/CD 整合</Sub>
      <CodeBlock code={`# GitHub Actions 中使用 Claude Code
- name: Claude Code Review
  run: |
    claude -p "Review the changes in this PR for security issues and suggest fixes" \\
      --model opus \\
      --dangerously-skip-permissions \\
      --output-format json > review.json

# 或用於自動修復
- name: Auto-fix lint errors
  run: |
    claude -p "Fix all TypeScript and ESLint errors in src/" \\
      --dangerously-skip-permissions`} />

      <Sub>模式五：團隊共享設定</Sub>
      <P>
        把 skills、MCP 設定、CLAUDE.md 都進 git，讓整個團隊共享同一套工具鏈。
      </P>
      <CodeBlock code={`# 進 git 的檔案
git add CLAUDE.md              # 專案記憶
git add .mcp.json              # MCP server 設定
git add .claude/skills/        # 共享 skills
git add .claude/hooks.json     # 自動化 hooks

# 不進 git（個人設定）
# CLAUDE.local.md
# ~/.claude/CLAUDE.md`} />

      <Divider />

      <Sub>推薦的學習路徑</Sub>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { step: "Week 1", title: "建立 CLAUDE.md", desc: "讓 Claude 了解你的專案架構和慣例" },
          { step: "Week 2", title: "設定 MCP", desc: "連接 GitHub、資料庫等日常工具" },
          { step: "Week 3", title: "寫第一個 Skill", desc: "把你最常執行的 workflow 自動化" },
          { step: "Week 4", title: "加入 Subagents", desc: "把複雜任務分解並平行處理" },
          { step: "Month 2+", title: "Hooks + CI 整合", desc: "建立完全自動化的開發管線" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              background: "#111",
              border: "1px solid #1e1e1e",
              borderRadius: "8px",
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                background: "#e8500a",
                color: "#fff",
                borderRadius: "4px",
                padding: "2px 10px",
                fontSize: "11px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {item.step}
            </div>
            <div>
              <div style={{ color: "#f0f0f0", fontWeight: 600, fontSize: "14px" }}>{item.title}</div>
              <div style={{ color: "#888", fontSize: "13px", marginTop: "2px" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export default function App() {
  const [active, setActive] = useState("intro");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f0f0f0",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          flexShrink: 0,
          borderRight: "1px solid #1e1e1e",
          padding: "28px 0",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "0 20px 24px" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#e8500a",
              marginBottom: "4px",
            }}
          >
            Claude Code
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#f0f0f0",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            工程師教學
          </div>
        </div>

        <nav>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 20px",
                background: active === s.id ? "#e8500a15" : "transparent",
                border: "none",
                borderLeft: `2px solid ${active === s.id ? "#e8500a" : "transparent"}`,
                color: active === s.id ? "#f0f0f0" : "#666",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: active === s.id ? 600 : 400,
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "15px" }}>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        <div
          style={{
            margin: "24px 20px 0",
            padding: "12px",
            background: "#111",
            borderRadius: "6px",
            border: "1px solid #1e1e1e",
          }}
        >
          <div style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>版本</div>
          <div style={{ fontSize: "12px", color: "#888" }}>Claude Code v2.1+</div>
          <div style={{ fontSize: "11px", color: "#555", marginTop: "6px" }}>更新</div>
          <div style={{ fontSize: "12px", color: "#888" }}>June 2026</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "40px 48px", maxWidth: "760px", overflowY: "auto" }}>
        {sections_content[active]?.()}
      </div>
    </div>
  );
}
