# 船舶订单复核开发版

当前已跑通：DeepSeek Harness Desktop → 千问 → 原生订单工具 → 程序核算 → 保存待复核报告 → 模型解释。

## 启动

在仓库目录执行：

```sh
npm ci
SHIP_DSH_HOME="$HOME/Library/Application Support/dsh-desktop-dev/harness" node scripts/setup-ship-dev.mjs
SHIP_LOCAL_API_KEY=local-development-placeholder npm run dev
```

上述占位值只用于当前未启用密钥认证的回环开发服务，不是生产密钥。模型服务地址默认 `http://127.0.0.1:18081/v1`，须先建立已配置的 SSH 转发；客户内网部署时通过 `SHIP_MODEL_URL` 设置目标服务地址。不得将开发占位值当作生产鉴权措施。

客户端中选工作区 `ship-delivery`，选择“船舶订单复核”和“船舶订单模型”，输入“请处理模拟订单 demo003”。

## 数据约定

`orders` 保存原始结构化订单，`reviews` 保存按原件内容指纹命名的程序核算结果。插件只接收订单编号，不接收模型自行编写的金额。金额用整数分计算，数量支持两位小数；存在分以下尾数时停止并要求明确舍入规则。当前仅接受平方米、块，不认识的单位必须转人工。

原件不被核算工具修改，同指纹报告不被重复调用覆盖。每个报告标注“待工程师复核”，不会自动形成采购批准。当前未实现人工签认界面、账号权限、历史检索、图片转结构化订单以及多人共享数据库。

## 验证

- `npx vitest run test/ship-order.test.ts`
- `npm run typecheck`
- `npm run build`
- 完整上游测试使用 `npx vitest run --maxWorkers=2`，避免大量测试并发导致本机超时。

此目录包含模拟数据，不是真实客户订单。当前是 macOS 开发链路，尚未形成 Windows 客户安装包，也未完成断网验收。

## 会议版业务窗口

菜单“船舶工作台 → 打开业务工作台”（Command+Shift+J）打开原生桌面业务窗口。支持多模拟订单、七步流程、模拟治理批次、案例筛选关联、候选技能验证记录和导出。数据保存于开发版用户目录的ship-workbench/workbench.json，与Harness会话资料分开。

工作台已经封装为 `ship-workbench` Harness 业务插件。Desktop 仅打开插件页面；插件通过会话控制服务创建或复用订单会话，选择模型并提交任务。Agent 通过 `ship-workbench/tools.js` 加载原生订单工具，工具校验订单与会话关联后执行程序核算。工作台轮询真实会话事件，展示任务状态、工具调用与回复，没有直接请求模型的旁路。

每单独立会话、同单重试复用；运行期间阻止修改该订单。错误工具结果、回答截断或任务中断不会标记为成功。顶部“查看订单 Agent 轨迹”展示本轮事件；Harness 主窗口也保留完整会话。程序核算等确定性操作由业务服务执行，只有“启动订单 Agent 分析”启动 Agent。

开发安装脚本会把插件链接到主服务和订单预设各自的依赖目录。必须先启动一次 Desktop 生成开发目录，再退出执行配置脚本。该链接方式仅供本机开发；离线交付需打包插件、运行时、模型及完整依赖实体，不能携带指向开发机的符号链接。

模型输出保留原文，展示金额去掉千位逗号。模拟清洗是预置问题的流程演示，知识库为关键词筛选；技能卡片尚不是已发布、可动态加载的技能包。详见会议演示脚本。

插件回归检查：`npx vitest run test/ship-plugin.test.ts test/ship-workbench.test.ts test/ship-order.test.ts`。


## 当前主入口：纸单转电子档案

主页面已改为纸单连续流程，使用独立的 `paper-orders.json` 保存状态，原图保存在 `paper-originals`，旧演练订单仍保留。重新运行开发配置脚本会安装纸单识别／复核两套专用预设，并为现有模型声明图片输入能力。

入口文件为插件的 `paper.js`、`paper-tools.js`、`paper-state.js` 与 `public/paper*`。图片通过 Harness 图片消息接口发送，未绕过 Harness 请求模型。识别草稿必须经人工确认后才进入检查；工具保留原金额并生成差异，未说明的问题会阻止归档。支持12兆以内的单页PNG、JPEG、WebP；当前不支持PDF。

以本节和最新会议演示脚本为准；前面的多模块页面属于早期演示记录。当前纸单流程不依赖模拟知识库，也未声称自动发布技能。
