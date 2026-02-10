# electron-quick-start

基于 **Electron + Vite + Vue 3** 的多页桌面应用模板，主页使用经典 TodoMVC 案例。

---

## 项目结构

```
electron-quick-start/
├── electron/                    # Electron 主进程代码
│   ├── main.js                  #   主进程入口（窗口管理、IPC 通信）
│   └── preload.js               #   预加载脚本（contextBridge 桥接）
├── src/                         # 渲染进程代码（Vue 3 应用）
│   ├── pages/
│   │   ├── main/                #   主页 - TodoMVC
│   │   │   ├── App.vue          #     根组件
│   │   │   ├── main.js          #     页面入口
│   │   │   └── components/      #     页面组件
│   │   │       ├── TodoHeader.vue
│   │   │       ├── TodoList.vue
│   │   │       ├── TodoItem.vue
│   │   │       └── TodoFooter.vue
│   │   └── about/               #   关于页
│   │       ├── App.vue
│   │       └── main.js
│   └── styles/                  # 全局样式
│       ├── base.css
│       ├── todomvc.css
│       └── about.css
├── public/                      # 静态资源（不参与构建）
│   └── icon.png                 #   应用图标（打包时使用）
├── index.html                   # 主页 HTML 入口
├── about.html                   # 关于页 HTML 入口
├── vite.config.js               # Vite + Electron 插件配置
├── package.json                 # 项目配置 & electron-builder 打包配置
├── .nvmrc                       # Node 版本锁定（18）
├── .npmrc                       # npm 镜像配置
└── .editorconfig                # 编辑器格式化配置
```

### 构建产物目录（gitignore）

```
├── dist/                        # Vite 构建的前端资源
├── dist-electron/               # Vite 构建的 Electron 主进程 & preload
└── release/                     # electron-builder 打包产物（exe/dmg 等）
```

---

## 技术栈

| 技术                 | 版本    | 说明                         |
| -------------------- | ------- | ---------------------------- |
| **Electron**         | ^28.0.0 | 桌面应用框架（内置 Node 18） |
| **Vite**             | ^5.4.0  | 前端构建工具                 |
| **Vue**              | ^3.4.0  | 前端框架（Composition API）  |
| **electron-builder** | ^24.9.0 | 应用打包工具                 |
| **Node 环境**        | >=18    | 运行环境（`.nvmrc` 锁定）    |

---

## 快速开始

### 1. 安装依赖

```bash
# 确保使用 Node 18+
node -v

# 安装依赖
npm install
```

### 2. 启动开发模式

```bash
npm run dev
```

启动后会自动：

- 启动 Vite 开发服务器（默认 http://localhost:5173）
- 构建 Electron 主进程和 preload 脚本
- 打开 Electron 窗口加载主页

> 修改渲染进程代码（Vue 组件、样式）会自动热更新（HMR），无需重启。
> 修改主进程 / preload 代码会自动重新构建并重载窗口。

---

## 调试开发

### 渲染进程调试（前端页面）

在 Electron 窗口中，使用快捷键打开 DevTools：

| 平台    | 快捷键                      |
| ------- | --------------------------- |
| Windows | `Ctrl + Shift + I` 或 `F12` |
| macOS   | `Cmd + Option + I`          |

也可以在 `electron/main.js` 中取消注释来默认打开 DevTools：

```js
// 在 createMainWindow 函数中添加：
mainWindow.webContents.openDevTools();
```

### 主进程调试

**方式一：VS Code 调试**

创建 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Electron Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "args": [".", "--remote-debugging-port=9222"],
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "outputCapture": "std",
      "sourceMaps": true
    }
  ]
}
```

> 注意：使用此方式前需先运行 `npm run build` 构建一次。

**方式二：console.log 日志**

主进程中的 `console.log` 输出会打印在启动终端中，可直接查看。

### 渲染进程 Vue Devtools

安装 Vue Devtools 浏览器扩展后，在 Electron DevTools 中可直接使用。也可以使用独立版：

```bash
# 安装独立 Vue Devtools
npm install -g @vue/devtools

# 启动
vue-devtools
```

然后在 `index.html` 的 `<head>` 中添加：

```html
<script src="http://localhost:8098"></script>
```

---

## 打包构建

### 构建前端资源（不打包 exe）

```bash
npm run build
```

产物输出到 `dist/` 和 `dist-electron/` 目录。

### 打包为安装程序（exe / dmg / AppImage）

```bash
# 打包为安装程序
npm run build:exe

# 仅生成免安装目录（调试打包问题时使用）
npm run build:exe:dir
```

产物输出到 `release/` 目录。

### 打包配置说明

打包配置位于 `package.json` 的 `"build"` 字段：

```jsonc
{
  "build": {
    "appId": "com.electron.quick-start", // 应用唯一标识
    "productName": "Electron Quick Start", // 应用显示名称
    "directories": {
      "output": "release" // 打包输出目录
    },
    "files": [
      // 需要打包的文件
      "dist/**/*",
      "dist-electron/**/*"
    ],
    "win": {
      // Windows 平台配置
      "target": [{ "target": "nsis", "arch": ["x64"] }],
      "icon": "public/icon.png" // 应用图标（至少 256x256）
    },
    "nsis": {
      // NSIS 安装程序配置
      "oneClick": false, // 非一键安装
      "allowToChangeInstallationDirectory": true // 允许选择安装目录
    }
  }
}
```

### 应用图标

- 放置位置：`public/icon.png`
- Windows：建议 256x256 或更大的 `.png` / `.ico`
- macOS：建议 512x512 的 `.png` / `.icns`

> 如果没有提供图标文件，electron-builder 会使用默认图标。

---

## 新增页面

以新增一个 **设置页（Settings）** 为例，需要 4 步：

### 步骤 1：创建 HTML 入口

在项目根目录创建 `settings.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>设置 - Electron</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/pages/settings/main.js"></script>
  </body>
</html>
```

### 步骤 2：创建 Vue 页面

创建 `src/pages/settings/main.js`：

```js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

创建 `src/pages/settings/App.vue`：

```vue
<template>
  <div class="settings">
    <h1>设置</h1>
    <!-- 页面内容 -->
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
/* 页面样式 */
</style>
```

### 步骤 3：注册到 Vite 多页配置

在 `vite.config.js` 中的 `build.rollupOptions.input` 添加新入口：

```js
build: {
  rollupOptions: {
    input: {
      main: resolve(__dirname, "index.html"),
      about: resolve(__dirname, "about.html"),
      settings: resolve(__dirname, "settings.html"),  // ← 新增
    },
  },
},
```

### 步骤 4：在主进程中创建窗口

在 `electron/main.js` 中添加窗口创建函数：

```js
let settingsWindow;

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 600,
    height: 400,
    parent: mainWindow,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}settings.html`);
  } else {
    settingsWindow.loadFile(path.join(process.env.DIST, "settings.html"));
  }

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

// 注册 IPC 监听
ipcMain.on("open-settings", () => {
  createSettingsWindow();
});
```

如需从渲染进程打开该窗口，在 `electron/preload.js` 中暴露 API：

```js
contextBridge.exposeInMainWorld("electronAPI", {
  // ...已有 API
  openSettings: () => ipcRenderer.send("open-settings"),
});
```

---

## 核心概念

### 进程架构

```
┌─────────────────────────────────────────────────┐
│                  Electron 应用                   │
│                                                  │
│  ┌──────────────┐                                │
│  │  主进程       │  electron/main.js              │
│  │  (Node.js)   │  - 窗口管理                     │
│  │              │  - IPC 通信                      │
│  │              │  - 系统 API 调用                  │
│  └──────┬───────┘                                │
│         │ contextBridge (preload.js)              │
│  ┌──────┴───────┐  ┌──────────────┐              │
│  │  渲染进程 1   │  │  渲染进程 2   │              │
│  │  (主页)      │  │  (关于页)     │   ...更多窗口 │
│  │  index.html  │  │  about.html  │              │
│  │  Vue 3 App   │  │  Vue 3 App   │              │
│  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────┘
```

### IPC 通信模式

渲染进程与主进程之间通过 `preload.js` 的 `contextBridge` 安全通信：

```
渲染进程                    preload.js                主进程
(Vue 组件)               (contextBridge)          (electron/main.js)
    │                         │                        │
    │  window.electronAPI     │                        │
    │  .openAbout()           │                        │
    ├────────────────────────►│  ipcRenderer.send()    │
    │                         ├───────────────────────►│
    │                         │                        │  createAboutWindow()
    │                         │                        │
```

**单向通信（渲染 → 主进程）：**

```js
// preload.js
openAbout: () => ipcRenderer.send("open-about");

// main.js
ipcMain.on("open-about", () => {
  /* 处理 */
});
```

**双向通信（请求-响应）：**

```js
// preload.js
getData: () => ipcRenderer.invoke("get-data");

// main.js
ipcMain.handle("get-data", async () => {
  return { key: "value" };
});

// Vue 组件中
const data = await window.electronAPI.getData();
```

---

## 常用命令一览

| 命令                    | 说明                                 |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | 启动开发模式（Vite HMR + Electron）  |
| `npm run build`         | 构建前端资源                         |
| `npm run build:exe`     | 构建并打包为安装程序（exe / dmg 等） |
| `npm run build:exe:dir` | 构建并生成免安装目录（用于调试打包） |
| `npm run preview`       | 预览构建后的前端页面                 |

---

## 常见问题

### Q: 开发时修改代码后 Electron 窗口没有更新？

- 渲染进程（Vue 组件、CSS）修改后会自动 HMR
- 主进程 / preload 修改后会自动重新构建，但可能需要手动关闭重开窗口
- 如果仍然不更新，可以用 `Ctrl+R` 刷新窗口

### Q: 打包时报错找不到图标？

确保 `public/icon.png` 文件存在，或者在 `package.json` 的 `build` 配置中删除 `icon` 字段使用默认图标。

### Q: 如何在渲染进程中使用 Node.js API？

出于安全考虑，渲染进程默认禁用了 `nodeIntegration`。请通过 `preload.js` 使用 `contextBridge` 暴露需要的 API，不要直接启用 `nodeIntegration`。

### Q: 打包后应用白屏？

检查 `electron/main.js` 中 `process.env.DIST` 路径是否正确指向 `dist` 目录，确保 `vite build` 已正确执行。
