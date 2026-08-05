import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/sites/amanmal-1785808382901/",
  plugins: [react(), tailwindcss()],
})