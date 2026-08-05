import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/sites/mukeemkhan-1785382284458/",
  plugins: [react(), tailwindcss()],
})