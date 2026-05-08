# HyperWeb-O

基于 Web 的轻量级操作系统界面 - 使用 React + TypeScript 构建

## 功能特点

- **锁屏界面** - 精美的锁屏交互体验
- **控制中心** - WiFi、蓝牙、手电筒、亮度、音量控制
- **多任务管理** - 最近应用列表，支持清空所有
- **应用市场** - 应用商店管理
- **主题商店** - 主题个性化设置

### 内置应用

| 应用 | 说明 |
|------|------|
| Gemini助手 | AI 智能助手 |
| 浏览器 | 网页浏览 |
| 计算器 | 科学计算器 |
| 相机 | 拍照功能 |
| 时钟 | 闹钟与世界时间 |
| 相册 | 图片浏览 |
| 笔记 | 随手记录 |
| 应用市场 | 应用管理 |
| 主题商店 | 主题切换 |

## 技术栈

- **React** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具

## 项目结构

```
├── App.tsx                    # 主应用入口
├── index.tsx                  # React 挂载点
├── index.html                 # HTML 入口
├── constants.tsx              # 常量定义（应用、壁纸等）
├── components/
│   ├── StatusBar.tsx          # 状态栏
│   ├── ControlCenter.tsx      # 控制中心
│   ├── LockScreen.tsx         # 锁屏
│   ├── NavigationBar.tsx      # 导航栏
│   ├── Recents.tsx            # 最近应用
│   └── apps/                  # 内置应用
│       ├── AppMarket.tsx       # 应用市场
│       ├── Browser.tsx         # 浏览器
│       ├── Calculator.tsx      # 计算器
│       ├── Camera.tsx          # 相机
│       ├── Clock.tsx           # 时钟
│       ├── Gallery.tsx        # 相册
│       ├── GeminiAssistant.tsx # Gemini助手
│       ├── Notes.tsx          # 笔记
│       ├── Settings.tsx       # 设置
│       ├── SimpleApps.tsx     # 简单应用
│       └── ThemeStore.tsx     # 主题商店
```

## 快速开始

```bash
# 克隆项目
git clone https://github.com/wjzsj/HyperWeb-O.git

# 进入目录
cd HyperWeb-O

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 构建部署

```bash
# 构建生产版本
npm run build
```

## 系统预览

```
┌─────────────────────────────┐
│  状态栏 (时间、信号、电池)   │
├─────────────────────────────┤
│                             │
│      应用图标网格           │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐     │
│   │📱│ │🌐│ │📷│ │📝│     │
│   └──┘ └──┘ └──┘ └──┘     │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐     │
│   │🧮│ │📁│ │⚙️│ │🛒│     │
│   └──┘ └──┘ └──┘ └──┘     │
│                             │
├─────────────────────────────┤
│     导航栏 (主页/返回)       │
└─────────────────────────────┘
```

## 操作说明

- **主页键** - 返回主屏幕
- **返回键** - 返回上一级/关闭应用
- **多任务键** - 查看最近应用
- **下滑** - 打开控制中心

## 许可证

MIT License
