import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

const resolve = dir => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
