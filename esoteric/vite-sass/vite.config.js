import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import { defineConfig } from 'vite';
import glob from 'fast-glob';

import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
   plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      ViteImageOptimizer({
         png: {
            quality: 86
         },
         jpeg: {
            quality: 86
         },
         jpg: {
            quality: 86
         }
      }),
      {
         ...imagemin(['./src/img/**/*.{jpg,png,jpeg}'], {
            destination: './src/img/webp/',
            plugins: [imageminWebp({ quality: 86 })]
         }),
         apply: 'serve'
      }
   ],
   root: 'src',
   base: '',
   build: {
      minify: false, // disable minification
      rollupOptions: {
         input: Object.fromEntries(
            glob
               .sync(['./src/*.html', './src/pages/**/*.html'])
               .map((file) => [
                  path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
                  fileURLToPath(new URL(file, import.meta.url))
               ])
         ),
         // output unminified CSS file
         output: {
            assetFileNames: 'assets/[name].[ext]'
         }
      },
      outDir: '../dist',
      emptyOutDir: true
   }
});
