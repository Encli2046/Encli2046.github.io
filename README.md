# Encli2046.github.io

基于 Astro 重建的个人博客与互联网观察站。

## 开发

需要 Node.js `>=22.12.0`。

```bash
npm install
npm run dev
```

## 内容规则

- `posts`：正式文章、技术观察和主题整理。
- `timeline`：年度互联网与技术时间线，必须包含来源。
- `briefs`：行业资讯短文，必须包含来源。
- `notes`：生活札记和主观感受。

## 资料池

年度时间线从 `src/data/signals/*.json` 生成：

```bash
npm run content:timeline
```

每条事件必须包含 `source`，并注明 `url`、`publisher` 和 `accessed`。生成后的 Markdown 会写入 `src/content/timeline/`。

构建前会运行 `npm run check:content`，用于阻止缺少来源的资料类内容进入发布产物。
