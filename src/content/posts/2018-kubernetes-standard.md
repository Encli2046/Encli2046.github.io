---
title: "2018：Kubernetes 成为容器编排的事实标准"
description: "从 Docker 集成、CNCF 成熟度、AWS EKS 发布和社区治理观察 Kubernetes 在 2018 年确立平台地位的路径。"
date: 2018-12-30
image: "https://placehold.co/800x400/152035/01AD9F?text=Kubernetes+2018"
categories: ["技术观察"]
authors: ["Encli"]
tags: ["2018", "Kubernetes", "云原生", "容器", "基础设施"]
sourceType: "资料整理"
sources:
  - title: "Amazon EKS Now Generally Available"
    url: "https://aws.amazon.com/blogs/aws/amazon-eks-now-generally-available/"
    publisher: "AWS Blog"
    accessed: 2026-05-12
  - title: "Docker Kubernetes Integration Announced"
    url: "https://www.docker.com/blog/kubernetes-docker-platform-and-moby-project/"
    publisher: "Docker Blog"
    accessed: 2026-05-12
  - title: "CNCF Annual Report 2018"
    url: "https://www.cncf.io/reports/cncf-annual-report-2018/"
    publisher: "CNCF"
    accessed: 2026-05-12
---

2018 年，容器编排之战正式落下帷幕。Kubernetes 从众多竞争者（Docker Swarm、Mesos、Nomad）中胜出，成为云原生基础设施的事实标准。

## 三大云厂商全面托管

2018 年 6 月，AWS 终于推出 EKS（Elastic Kubernetes Service）的正式版本，补上了三大云厂商 Kubernetes 托管服务的最后一块拼图。就在一年前的 2017 年，Azure 推出了 AKS，Google 的 GKE 已经运行多年。

当三大云厂商各自拥有成熟 Kubernetes 托管服务时，意味着 Kubernetes 不再只是早期采用者的实验工具，而是企业可以纳入采购清单的基础设施产品。CNCF 2018 年度报告称参与 CNCF 项目的组织和贡献者数量在这一年翻了一番。

## Docker 从竞争者转为集成者

如果 2017 年 Docker 宣布 Moby Project 还只是拆分信号，2018 年 Docker EE 与 Kubernetes 的原生集成则是一次明确的战略转向。Docker 不再试图在编排层与 K8s 竞争，而是选择成为 K8s 生态的一部分。

这个决定的影响深远。Docker 作为容器化的代名词，其团队和产品向 K8s 靠拢，意味着容器编排的标准化方向已经没有悬念。

## 社区治理与生产就绪

2018 年，Kubernetes 社区在治理和技术成熟度上都迈出了重要一步：

- 发布周期稳定下来，每个季度一次小版本
- 引入了基于 SIG（Special Interest Group）的社区治理模型
- Helm 成为 CNCF 孵化项目，包管理工具走向成熟
- 服务网格（Istio、Linkerd）开始与 K8s 深度整合

**观点判断：** 2018 年 Kubernetes 的胜利不代表容器的故事讲完了。恰恰相反，容器编排的标准化意味着下一个问题开始浮现：可观测性、安全策略、成本优化、多集群管理——这些才是生产中真正复杂的部分。

## 小结

2018 年是 Kubernetes 确立平台地位的关键一年。三大云厂商的托管服务、Docker 的战略转向和社区治理的成熟，让容器编排从'选什么'变成了'怎么做好'。云原生的基础层在这一年趋于稳定，但应用层的分布式系统复杂性才刚刚展开。
