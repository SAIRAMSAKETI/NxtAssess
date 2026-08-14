// import {defineConfig} from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     port: 3000,
//     host: '0.0.0.0',
//     allowedHosts: true,
//   },
//   build: {
//     outDir: 'build',
//   },
//   plugins: [react()],
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: './src/setupTests.js',
//   },
// })

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,

    proxy: {
      '/api': {
        target: 'https://apis.ccbp.in',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    outDir: 'disk',
  },

  plugins: [react()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
