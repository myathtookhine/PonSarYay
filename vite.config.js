import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { seoAdsPlugin } from './plugins/seoAdsPlugin.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // SSR build is only used at build time by scripts/prerender.mjs
  if (isSsrBuild) {
    return {
      plugins: [react()],
      build: {
        outDir: 'dist-ssr',
        emptyOutDir: true,
        rollupOptions: {
          output: { entryFileNames: '[name].mjs', chunkFileNames: '[name]-[hash].mjs' },
        },
      },
    };
  }

  return {
    plugins: [
      react(),
      seoAdsPlugin(env),
      compression({ algorithm: 'gzip' })
    ],
    server: {
      port: 5173,
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    }
  };
});
