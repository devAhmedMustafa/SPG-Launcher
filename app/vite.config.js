import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@": "/src",
      "@Components": "/src/Components",
      "@Hooks": "/src/Hooks",
      "@Pages": "/src/Pages",
      "@Utils": "/src/Utils",
      "@Styles": "/src/Styles"
    },
  }
})
