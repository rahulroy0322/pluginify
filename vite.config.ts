import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // VitePWA({
    //   registerType: 'autoUpdate',
    //   strategies: 'injectManifest',
    //   srcDir: 'src',
    //   filename: 'sw.ts',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    //   manifest: {
    //     name: 'plugins',
    //     short_name: 'MyApp',
    //     description: 'App with GitHub caching',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   },
    //   devOptions: {
    //     enabled: true, // Enable SW in development
    //     type: 'module',
    //     navigateFallback: 'index.html'
    //   },
    //   // Development-friendly settings
    //   injectManifest: {
    //     globPatterns: ['**.{js,css,html,ico,png,svg}']
    //   }
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

/*

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'My App',
        short_name: 'MyApp',
        description: 'App with GitHub caching',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true, // Enable SW in development
        type: 'module',
        navigateFallback: 'index.html'
      },
      // Development-friendly settings
      injectManifest: {
        globPatterns: ['**.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
*/
