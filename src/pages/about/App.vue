<template>
  <div class="about-container">
    <div class="about-card">
      <div class="logo-section">
        <div class="logo">⚡</div>
        <h1>Electron + Vite + Vue 3</h1>
        <p class="subtitle">多页应用模板</p>
      </div>

      <div class="divider"></div>

      <div class="info-section">
        <h2>技术栈</h2>
        <ul class="tech-list">
          <li>
            <span class="tech-icon">🖥️</span>
            <div>
              <strong>Electron</strong>
              <span class="version">{{ electronVersion }}</span>
            </div>
          </li>
          <li>
            <span class="tech-icon">⚡</span>
            <div>
              <strong>Vite</strong>
              <span class="version">5.x</span>
            </div>
          </li>
          <li>
            <span class="tech-icon">💚</span>
            <div>
              <strong>Vue</strong>
              <span class="version">3.4</span>
            </div>
          </li>
          <li>
            <span class="tech-icon">🟢</span>
            <div>
              <strong>Node.js</strong>
              <span class="version">{{ nodeVersion }}</span>
            </div>
          </li>
          <li>
            <span class="tech-icon">🌐</span>
            <div>
              <strong>Chromium</strong>
              <span class="version">{{ chromeVersion }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="divider"></div>

      <div class="info-section">
        <h2>项目特性</h2>
        <ul class="feature-list">
          <li>✅ Vite 快速热重载开发</li>
          <li>✅ Vue 3 Composition API</li>
          <li>✅ 多页面架构支持</li>
          <li>✅ Electron 主进程 / 渲染进程分离</li>
          <li>✅ 安全的 contextBridge 通信</li>
          <li>✅ TodoMVC 示例页面</li>
        </ul>
      </div>

      <div class="footer">
        <p>Node.js 18 运行环境 · 使用 JavaScript 编写</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nodeVersion = ref('N/A')
const chromeVersion = ref('N/A')
const electronVersion = ref('N/A')

onMounted(() => {
  if (window.electronAPI?.versions) {
    nodeVersion.value = window.electronAPI.versions.node()
    chromeVersion.value = window.electronAPI.versions.chrome()
    electronVersion.value = window.electronAPI.versions.electron()
  }
})
</script>

