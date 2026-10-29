---
title: SIGNAL
pubDate: '2026-10-29'
---

SIGNAL 是一个在浏览器中运行的交互式数字演出工具，灵感来自《Phigros》主线第九章曲目 *Desultory Signals* 的开场动画——那段随难度提升出现的“数字突脸”。

[在线体验](https://lylighte.github.io/signal-replica/) · [GitHub](https://github.com/Lylighte/signal-replica) · [B站动态](https://www.bilibili.com/opus/1261640286699782163)

![SIGNAL 的数字演出效果](/images/signal-replica.png)

## 功能

- **内容与布局**：支持 1–16 个自定义选项，数字 1–4 位并保留前导零；可单项聚焦、轮播、分页或多选项同屏，提供自动、2×2、3×3、4×4 布局。
- **画幅**：16:9、4:3、1:1、9:16，支持居中裁剪、自适应缩放和智能重排，并针对桌面、移动端和有限高度视口适配。
- **动画与时间轴**：数字滚轮、文字选择、光晕、扫描线、曲面与故障动画；入场、选择、滚动、稳定、故障、退场各阶段时长可分别调整。可视化关键帧轨道支持数字、标签、选项和图层属性，提供 Linear、Ease In、Ease Out、Ease In Out 插值。
- **外观**：数字、文字、背景、光晕、扫描线和故障颜色均可自定义，支持 HEX、RGB、RGBA 和渐变；可调 RGB 色差、条带偏移、震动和五阶段抖动，内置原版、纯白、粉色、紫色、青色、赛博霓虹等主题。
- **字体与图层**：支持 TTF、OTF、WOFF、WOFF2 字体，以及文字、PNG、JPEG、WebP、SVG 图层；位置、缩放、旋转、透明度、层级、混合模式、遮罩和发光均可调整。
- **音频与节拍**：可使用原版音轨、自定义音轨或无音轨，支持音量、裁剪、循环和淡入淡出；可手动设置 BPM、节拍偏移与细分，也可用 Web Audio 在本地估算节拍，并按节拍触发闪屏、数字跳动、RGB 分离和震动。
- **项目与模板**：项目保存为 `signal-studio` v2 JSON，兼容旧版配置；内置原版 SIGNAL、音游成绩、系统启动、身份认证和数字倒计时模板，也可通过 URL Fragment 分享配置（不含音频、字体和图片等二进制资源）。
- **导出**：支持 MP4（H.264，可选 AAC 音轨，最高 4K / 165 FPS）、PNG 帧序列 ZIP（最多 5000 帧）和 GIF（最高 720p，多档压缩），并提供批量任务队列与 ZIP 打包。

## 实现

项目由原生 HTML、CSS、JavaScript 和 Canvas 编写，没有视频处理后端，也不需要本地安装 FFmpeg。预览与导出共用同一套确定性时间映射；MP4 编码基于 WebCodecs 在浏览器内完成，渲染器会按目标分辨率直接创建 Canvas，而不是放大 1080p 画面。

仓库：[Lylighte/signal-replica](https://github.com/Lylighte/signal-replica)（MIT License）

B站动态：[用 SIGNAL 创建你的难度新突破！](https://www.bilibili.com/opus/1261640286699782163)
