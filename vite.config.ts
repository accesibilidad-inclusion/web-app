import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component'
    }),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pictos',
        short_name: 'Pictos',
        description: 'Una aplicación de accesibilidad cognitiva para evaluar y utilizar distintos servicios',
        theme_color: '#4990CD',
        icons: [{
          "src": "/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
          }, {
          "src": "/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
          }, {
          "src": "/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
          }, {
          "src": "/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
          }, {
          "src": "/icons/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
          }, {
          "src": "/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
