import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/install.js"),
      name: "new-command-palette",
      fileName: (format) => `${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        }
      }
    }
  },
  plugins: [vue()],
});
