import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

const CONFIG_ENV = process.env.CONFIG_ENV || 'dev'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages')
    }
  },
  server: {
    https: false,
    open: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8038', // 如果有node 配置node接口, 统一请求后端接口代理, 或者这里可以配置多个代理
        changeOrigin: true,
        secure: false, // 如果是https接口, 需要配置这个参数
        ws: true, // websocket 支持
        // rewrite: path => path.replace(/^\api/, '')
      }
    }
  },
  define: {
    'process.env': {
      CONFIG_ENV
    }
  },
  optimizeDeps: {
    include: []
  }
})
