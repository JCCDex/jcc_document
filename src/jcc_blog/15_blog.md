# AI编程工具安装与模型接入实战 —— 从零到上手

![AI编程工具](/asset/15_blog_bg.png)

2026 年的 AI 编程工具已经从"要不要用"变成了"用哪个、怎么配"的问题。但很多开发者的第一步就卡住了 —— 工具装不上、模型接不进来、API Key 不知道往哪填。甚至面对Anthropic的对华立场，够你折腾的。

本文解决的就是这个：**手把手把主流工具装上，把模型配通**。照着做就能跑。

---

## 格局：一张表看懂 2026 主流 AI 编程工具

| 工具 | 形态 | 默认模型 | 是否支持第三方模型 | 开源 |
|------|------|----------|:---:|:---:|
| **Claude Code** | CLI | Claude 4.7 | ✅ OpenAI 兼容协议 | 否 |
| **OpenAI Codex CLI** | CLI | GPT-4o / Codex | ✅ 限 OpenAI 兼容 | 是 |
| **Cursor** | IDE | Claude / GPT | ✅ 自定义 API | 否 |
| **GitHub Copilot** | IDE 插件 | GPT-4o / Claude | ✅ 限平台内置 | 否 |
| **Cline** | IDE 插件 | 无默认（自选） | ✅ 几乎所有模型 | 是 |
| **Aider** | CLI | 无默认（自选） | ✅ 上百种模型 | 是 |

---

## 一、Claude Code —— Anthropic 的终端王牌

Claude Code 是目前最火的终端 AI 编程助手，擅长大型代码库重构、调试和多文件编辑。他有两个产品形态，一个是CLI，一个是GUI，CLI发的比较早，用户比较多，使用效率比较高，GUI发的比较晚，各种注册登录校验限制不说，甚至对于接中国模型还有限制，太麻烦了，我们只介绍CLI，GUI有兴趣可以自行探索。

### 1.1 安装

**前置条件**：Node.js >= 18

```bash
# 全局安装
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

### 1.2 模型选择

Claude Code 默认使用 Claude Opus 4.7，不过你使用海外模型工作，记得要科学上网，可在设置中切换：

```bash
# 查看当前模型
claude config show

# 切换模型（可选值：opus、sonnet、haiku）
claude config set model sonnet

# 或者用 /config 命令在交互中切换
/claude-config
```

四个模型档位：

| 模型 | 适用场景 | 相对速度 |
|------|----------|:---:|
| Opus 4.7 | 复杂架构、重构、调试 | 基准 |
| Sonnet 4.6 | 日常编码、代码审查 | 快 ~40% |
| Haiku 4.5 | 快速补全、简单任务 | 最快 |

### 1.3 接入第三方模型

Claude Code 支持任何兼容 OpenAI Chat Completions 协议的 API。我们就用最新的DeepSeek v4 pro举例，配置方式：

```bash
# 方式一：环境变量
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-.....
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max

# 方式二：配置文件 ~/.claude/settings.json
{
  "apiBaseUrl": "https://api.deepseek.com/anthropic",
  "apiKey": "sk-.....",
  "model": "deepseek-v4-pro[1m]",
  "defaultOpusModel": "deepseek-v4-pro[1m]",
  "defaultSonnetModel": "deepseek-v4-pro[1m]",
  "defaultHaikuModel": "deepseek-v4-flash",
  "subagentModel": "deepseek-v4-flash",
  "effortLevel": "max"
}
```

其他大模型可以同样参考官网的配置说明添加, 不一一赘述了。

![Cluade CLI 配置 Deepseek](/asset/15_blog_claude_deepseek.png)

---

## 二、OpenAI Codex CLI —— OpenAI 的终端反击

OpenAI 在 2026 年推出的终端工具，定位和 Claude Code 直接对标，开源且免费。

### 2.1 安装

```bash
# npm 全局安装
npm install -g @openai/codex

# 或者用 pip（如果你在 Python 生态）
pip install openai-codex

# 验证
codex --version
```

### 2.2 配置模型

```bash
# 初始化配置，这一步需要注册账号，要科学上网才行，邮箱最好用Gmail这些国外的邮箱
# 注册结束后，会提示你是否信任当前目录，开始扫描，嗯，最好在你的项目目录里面，不要在自己用户根目录，注意安全和隐私
codex init


# 如果你购买了OpenAI的大模型API，直接设置 API Key
export OPENAI_API_KEY="sk-xxx"
codex
```

Codex 默认使用 GPT-4o。切换模型：

```bash
# 临时切换
codex --model gpt-4o-mini

# 持久配置写入 ~/.codex/config.yaml
model: o4-mini
```

### 2.3 接入第三方模型

Codex CLI 是开源的，同样支持 OpenAI 兼容协议：

```bash
# 配置写在 ~/.codex/config.yaml
provider: openai-compatible
base_url: https://api.deepseek.com/v1
api_key: sk-xxx
model: deepseek-chat
```

或者用环境变量：

```bash
export OPENAI_BASE_URL="https://api.deepseek.com/v1"
export OPENAI_API_KEY="sk-xxx"
codex --model deepseek-chat
```

---

## 三、Cursor —— AI-Native IDE 标杆

Cursor 基于 VS Code 内核，加入了深度 AI 集成。是目前使用率最高的 AI IDE。

### 3.1 安装

```bash
# macOS
brew install --cask cursor

# 或者直接从官网下载 → cursor.com
# 也支持 Linux (.AppImage / .deb) 和 Windows (.exe)
```

### 3.2 内置模型配置

安装后打开 Cursor，`Cmd+Shift+P` → `Cursor Settings` → `Models`：

- **默认模型**：Claude Sonnet 4.6、GPT-4o 均已内置
- **切换方式**：在 Chat 面板底部下拉菜单直接选
- **用量**：Pro 用户有高速额度，超出后降级为慢速

### 3.3 接入自定义模型 / 第三方 API

Cursor → Settings → Models → "Add Custom Model"：

```
Name: DeepSeek Chat
API Base URL: https://api.deepseek.com/v1
API Key: sk-xxx
Model ID: deepseek-chat
```

支持任何 OpenAI 兼容的 API。这个特性让 Cursor 可以接入几乎所有公网模型，也可以配合本地 Ollama 使用。

### 3.4 小技巧：用 `.cursorrules` 定制行为

在项目根目录创建 `.cursorrules` 文件，定义 AI 的行为模式：

```
你是一个精通 Rust 和 Solidity 的区块链开发者。
回复使用中文，代码注释用英文。
每次修改前先说明你在改什么。
```

---

## 四、GitHub Copilot —— 装机量之王

Copilot 依然是 VS Code / JetBrains 里装机量最大的 AI 插件，2026 年已深度接入 GPT-4o 和 Claude。

### 4.1 安装

在 VS Code 中：

1. 打开扩展面板（`Cmd+Shift+X`）
2. 搜索 "GitHub Copilot"
3. 点击安装
4. 安装后会提示登录 GitHub 账号

或者在 JetBrains IDE：

```
Settings → Plugins → Marketplace → 搜索 "GitHub Copilot" → Install
```

### 4.2 模型选择

2026 年的 Copilot 支持多个模型：

VS Code 右下角 Copilot 图标 → 点击 → "Change Model"：

| 模型 | 擅长 |
|------|------|
| GPT-4o | 通用编码 |
| Claude Sonnet 4.6 | 复杂推理 |
| o4-mini | 快速补全 |
| Gemini 2.5 Pro | Google 生态项目 |

### 4.3 Copilot 的限制

Copilot 的模型选择限制在 GitHub 平台内置的范围内，**不支持配置自定义 API 接入第三方模型**。如果你需要灵活切换 DeepSeek、智谱等外部模型，看下一节 Cline。

---

## 五、Cline —— 多模型接入最灵活的开源插件

Cline 是 VS Code 上的开源 AI 编程插件，最大特点是 **API Provider 体系**，原生支持几乎所有主流模型，是这个系列里"多模型接入"最值得写的工具。

### 5.1 安装

1. VS Code 扩展面板搜索 "Cline"
2. 安装
3. 侧边栏出现 Cline 图标，点击进入

### 5.2 API Provider 配置

Cline 的核心设计就是让你自由选择模型。安装后点开 Cline 面板 → 顶部下拉菜单选择 Provider：

**Anthropic（Claude）**：

```
API Provider: Anthropic
API Key: sk-ant-xxx
Model: claude-opus-4-7  // 或 claude-sonnet-4-6
```

**OpenAI**：

```
API Provider: OpenAI
API Key: sk-xxx
Model: gpt-4o
```

**DeepSeek**：

```
API Provider: OpenAI Compatible
Base URL: https://api.deepseek.com
API Key: sk-xxx
Model ID: deepseek-chat
```

**智谱 GLM**：

```
API Provider: OpenAI Compatible
Base URL: https://open.bigmodel.cn/api/paas/v4
API Key: xxx.xxx
Model ID: glm-4-plus
```

**MiniMax**：

```
API Provider: OpenAI Compatible
Base URL: https://api.minimax.chat/v1
API Key: xxx
Model ID: abab7
```

**Ollama 本地模型**：

```
API Provider: Ollama
Base URL: http://localhost:11434
Model ID: qwen3:32b  // 或其他已拉取的模型
```

### 5.3 为什么 Cline 适合多模型场景

- **热切换**：换个 Provider 不用重启，下拉菜单秒切
- **对比测试**：同一个问题分别发给 DeepSeek 和 Claude，看看谁给的结果好
- **成本控制**：简单任务用 DeepSeek（便宜），复杂任务切 Claude（能力强）

---

## 六、Aider —— 开源 CLI 的标杆，支持上百种模型

Aider 是老牌开源 AI 编程 CLI 工具，支持模型数量最多，社区活跃，适合终端党。

### 6.1 安装

```bash
# pip 安装
pip install aider-chat

# 验证
aider --version
```

### 6.2 模型配置

Aider 的模型切换极为简单，运行时加 `--model` 参数：

```bash
# Claude
export ANTHROPIC_API_KEY="sk-ant-xxx"
aider --model claude-opus-4-7

# OpenAI
export OPENAI_API_KEY="sk-xxx"
aider --model gpt-4o

# DeepSeek
export DEEPSEEK_API_KEY="sk-xxx"
aider --model deepseek/deepseek-chat

# 智谱 GLM
export OPENAI_API_KEY="xxx"
aider --model openai/glm-4-plus \
  --openai-api-base https://open.bigmodel.cn/api/paas/v4

# MiniMax
aider --model openai/abab7 \
  --openai-api-base https://api.minimax.chat/v1

# Ollama 本地模型
aider --model ollama/qwen3:32b
```

### 6.3 多模型协作

Aider 支持指定"编辑模型"和"架构模型"：

```bash
# 架构设计用 Claude，代码编辑用 DeepSeek（省钱）
aider --model deepseek/deepseek-chat \
      --architect-model claude-opus-4-7
```

---

## 七、Ollama —— 本地模型的基石

很多开发者因为数据安全或网络问题不能用公网 API，Ollama 提供了干净的本地方案。

### 7.1 安装

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# 启动服务
ollama serve
```

### 7.2 下载模型

```bash
# 推荐几个适合编程的模型
ollama pull qwen3:32b          # 通义千问3（中文+编码均衡）
ollama pull deepseek-coder-v3  # 代码专精
ollama pull codestral:22b      # Mistral 代码模型
ollama pull llama3.3:70b       # Meta 最新

# 查看已安装
ollama list
```

### 7.3 让所有工具连接 Ollama

Ollama 提供 OpenAI 兼容端点 (`http://localhost:11434/v1`)，前面讲的所有工具都能连：

```bash
# Claude Code
export OPENAI_BASE_URL="http://localhost:11434/v1"
export OPENAI_API_KEY="ollama"
claude --provider openai --model openai/qwen3:32b

# Cursor → Settings → Add Custom Model
# Base URL: http://localhost:11434/v1
# Model: qwen3:32b

# Cline → API Provider: Ollama
# Base URL: http://localhost:11434
# Model: qwen3:32b

# Aider
aider --model ollama/qwen3:32b
```

---

## 速查表：模型 API 地址一图打尽

| 模型提供商 | API Base URL | 环境变量 |
|------------|--------------|----------|
| Anthropic | `https://api.anthropic.com` | `ANTHROPIC_API_KEY` |
| OpenAI | `https://api.openai.com/v1` | `OPENAI_API_KEY` |
| DeepSeek | `https://api.deepseek.com` | `DEEPSEEK_API_KEY` |
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` | `ZHIPU_API_KEY` |
| MiniMax | `https://api.minimax.chat/v1` | `MINIMAX_API_KEY` |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `DASHSCOPE_API_KEY` |
| Moonshot(Kimi) | `https://api.moonshot.cn/v1` | `MOONSHOT_API_KEY` |
| Ollama (本地) | `http://localhost:11434/v1` | 无需 |

---

## 选购建议：我该用哪个？

```javascript
const chooseTool = {
    
    我就想开箱即用: {
        推荐: "Cursor 或 Copilot",
        理由: "装完就能用，不需要折腾 API Key"
    },
    
    我在终端工作比较多: {
        首选: "Claude Code",
        备选: "Aider（开源、多模型支持好）"
    },
    
    我需要用国产模型省钱: {
        推荐: "Cline + DeepSeek / 智谱",
        理由: "Cline 的热切换最方便，DeepSeek 性价比最高"
    },
    
    数据不能出本地: {
        推荐: "Ollama + Cline / Aider",
        理由: "模型本地运行，配合 Cline 的 Ollama Provider 使用体验最流畅"
    },
    
    我要对比不同模型的效果: {
        推荐: "Cline 或 Aider",
        理由: "两个都支持秒级热切换模型，跑同一段代码看谁的输出好"
    }
};
```

---

## 下一步预告

这篇文章解决了"装上能用"。下一篇我们将进入高级玩法 —— **MCP（Model Context Protocol）**：如何给 AI 工具接入数据库查询、浏览器控制、文件系统等外部能力，让 AI 不仅写代码，还能帮你看线上日志、查数据库、操控浏览器调试页面。再下一篇聊**多 Agent 编排**：让 Claude 写代码、让 DeepSeek 审查、让 GPT 写测试，多模型协作像流水线一样跑起来。

---

### 关于作者

作者来自井畅科技团队，专注区块链基础设施与 AI 工程化研发。

### 加入讨论

🔹 **技术交流 QQ 群**: 568285439
🔹 **GitHub**: [jccdex](https://github.com/jccdex)
🔹 **公众号**: [井畅] - 每周更新，分享行业动态与技术心得

**每个工具都有坑，文中有什么配置跑不通的，或者有更好用的工具推荐，欢迎评论区交流。**
