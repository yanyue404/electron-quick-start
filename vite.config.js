import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        // Main process entry
        entry: "electron/main.js",
      },
      {
        // Preload scripts
        entry: "electron/preload.js",
        onstart(args) {
          args.reload();
        },
      },
    ]),
    renderer(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
      },
    },
  },
});
