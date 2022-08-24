import { defineConfig } from 'vite';
import * as path from "path";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    lib:{
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CommandPaletteVue3",
      fileName: (format) => `command-palette-vue3.${format}.js`,
    },
    rollupOptions:{
      external:[
        "vue",
        "fontawesomeSvgCore",
        "freeSolidSvgIcons",
        "vueFontawesome",
      ],
      output:{
        globals:{
          vue: "Vue",
        },
      },
    },
  },
});
