import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // @react-three/rapier 单独拆分（物理引擎 WASM，很重）
          if (id.includes('node_modules/@react-three/rapier')) {
            return 'rapier';
          }
          // three 核心 + drei
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three/drei')) {
            return 'three';
          }
          // framer-motion + gsap
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) {
            return 'motion';
          }
          // react 核心
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          // lucide-react 图标库
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
        },
      },
    },
  },
})
