import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/sites/amankhanol-1785805753017/",
  plugins: [react(), tailwindcss()],
})