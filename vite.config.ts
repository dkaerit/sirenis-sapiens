import path from "path"
import vue from "@vitejs/plugin-vue"
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from "vite"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    Markdown({}),
    ViteYaml({})
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})