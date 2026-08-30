import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: globalThis.process?.env?.GITHUB_ACTIONS ? '/formula-reference-app/' : '/',
  server: { allowedHosts: true },
})
