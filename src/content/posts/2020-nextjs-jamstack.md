---
title: "2020：Next.js 和静态站点的复兴浪潮"
description: "Next.js 9.3 引入 SSG、ISR 等能力，配合 Jamstack 架构理念，让静态网站生成从边缘玩法变成前端架构的主流选项。"
date: 2020-12-29
image: "https://placehold.co/800x400/152035/01AD9F?text=Next.js+Jamstack+2020"
categories: ["技术观察"]
authors: ["Encli"]
tags: ["2020", "Next.js", "Jamstack", "SSG", "React", "前端"]
sourceType: "资料整理"
sources:
  - title: "Next.js 9.3: Static Site Generation"
    url: "https://nextjs.org/blog/next-9-3"
    publisher: "Vercel"
    accessed: 2026-05-12
  - title: "Jamstack Community Survey 2020"
    url: "https://jamstack.org/survey/2020/"
    publisher: "Jamstack"
    accessed: 2026-05-12
  - title: "Incremental Static Regeneration"
    url: "https://nextjs.org/blog/next-9-5"
    publisher: "Vercel"
    accessed: 2026-05-12
---

2020 年，前端部署范式发生了一次反转：曾经被认为"过时"的静态网站生成（SSG）以 Jamstack 的名义强势回归，并成为许多团队的首选架构。

## SSG 和 ISR 的工程突破

Next.js 9.3 在 2020 年 3 月发布了三个关键特性构建了新的架构选项：

- **getStaticProps**：构建时获取数据并生成静态 HTML，页面速度极快
- **getServerSideProps**：保留服务端渲染能力用于动态数据场景
- 后续 9.5 版本引入 **ISR（Incremental Static Regeneration）**：在运行时按需重新生成静态页面，解决了传统静态生成的内容更新延迟问题

ISR 消除了"静态站点 = 内容更新延迟"的旧有等式。你可以同时拥有静态页面的性能和动态内容的时效性——这在之前被认为难以兼得。

## Jamstack 生态的工程化

Jamstack（JavaScript + API + Markup）在 2020 年从社群概念变成了工程实践：

- Netlify、Vercel 两家平台在部署体验上激烈竞争，推动了边缘计算和预览部署能力的快速进化
- 无头 CMS（Contentful、Strapi、Sanity）在这一年获得大量企业级采用
- Gatsby、Hugo、Eleventy 以及后来的 Astro，形成了多选项的 SSG 生态
- Jamstack Community Survey 2020 显示超过 60% 的受访者已经在生产环境中使用 Jamstack

## 静态优先成为架构选择

**观点判断：** 2020 年的 Jamstack 复兴不是"静态网站变酷了"，而是现代前端部署基础设施（CDN、边缘函数、构建工具）让静态优先成为了一种高级架构选择。性能和稳定性不再需要以牺牲动态性为代价。这是一个架构原则的回归：尽量把计算放到构建时，运行时只做必要的事。

## 小结

Next.js 的 SSG 和 ISR 突破让静态生成从博客和文档站的应用场景扩展到了电商、SaaS 落地页和内容平台。2020 年是"静态优先"从前卫选择走向团队默认选项的转折年。对于开发者来说，它意味着部署和架构的复杂度在一次范式转移中下降了。
