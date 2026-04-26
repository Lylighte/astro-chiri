# Lylighte's Home

[Chiri](https://github.com/the3ash/astro-chiri) 主题驱动的个人博客，基于 [Astro](https://astro.build) 构建。

> Chiri is a minimal blog theme built with Astro, offering customization options while preserving its clean aesthetic.

## 分支结构

| 分支 | 用途 |
|---|---|
| `main` | 同步上游 [the3ash/astro-chiri](https://github.com/the3ash/astro-chiri) |
| `personal` | 个人主页，基于上游定期同步更新框架 |
| `build` | CI 自动构建产物（`dist/`），供服务器拉取部署 |

## 部署流水线

```
写文章 → git push personal
                ↓
        GitHub Actions 构建
                ↓
        push dist 到 build 分支
                ↓
        ECS crontab 每 3h 拉取
                ↓
        Nginx serve 静态文件
```

## 仓库结构

```
.
├── public/                  # 静态资源
│   ├── feeds/               # RSS/Atom 样式
│   ├── fonts/               # 字体文件
│   ├── og/                  # Open Graph 图片
│   ├── screenshots/         # 截图
│   └── katex.min.css        # KaTeX 样式
├── scripts/                 # 工具脚本
│   ├── new-post.ts          # 新建文章
│   ├── toggle-proxy.ts      # 代理切换
│   └── update-theme.ts      # 更新主题
├── src/
│   ├── components/          # Astro 组件
│   │   ├── examples/        # 示例组件
│   │   ├── layout/          # 布局组件
│   │   ├── ui/              # UI 组件
│   │   └── widgets/         # 功能组件
│   ├── content/             # 内容
│   │   ├── about/           # 关于页面
│   │   └── posts/           # 文章
│   ├── layouts/             # 页面布局
│   ├── pages/               # 路由页面
│   │   ├── [...slug].astro  # 动态路由
│   │   ├── index.astro      # 首页
│   │   ├── atom.xml.ts      # Atom Feed
│   │   ├── rss.xml.ts       # RSS Feed
│   │   ├── api/proxy.ts     # API 代理
│   │   └── open-graph/      # OG 图片生成
│   ├── plugins/             # Remark/Rehype 插件
│   ├── styles/              # 全局样式
│   ├── types/               # TypeScript 类型
│   └── utils/               # 工具函数
├── .github/workflows/       # CI/CD
│   └── deploy.yml           # 构建部署
├── astro.config.ts          # Astro 配置
├── tsconfig.json            # TypeScript 配置
└── package.json
```

## 命令

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 本地开发 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览构建产物 |
| `pnpm new <title>` | 新建文章（`_title` 为草稿） |
| `pnpm update-theme` | 更新主题到最新版 |

## 原始项目

- 主题：**[the3ash/astro-chiri](https://github.com/the3ash/astro-chiri)**
- 演示：https://chiri.the3ash.com/

## License

[MIT](LICENSE)
