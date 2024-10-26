import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import path from 'path';
import glob from 'fast-glob';

import { createHtmlPlugin } from 'vite-plugin-html';
import FullReload from 'vite-plugin-full-reload';
import injectHTML from 'vite-plugin-html-inject';

function imageminOptimize() {
   return {
      name: 'vite-plugin-imagemin-optimize',
      apply: 'serve',
      async closeBundle() {
         await imagemin(['src/assets/images/**/*.{jpg,png,jpeg,gif,webp}'], {
            destination: 'src/assets/images/minified/',
            plugins: [imageminWebp({ quality: 86 })]
         });
         console.log('Images optimized with imagemin');
      }
   };
}

function imageminOptimizeBuild() {
   return {
      name: 'vite-plugin-imagemin-optimize',
      apply: 'build',
      async closeBundle() {
         await imagemin(['src/assets/images/**/*.{jpg,png,jpeg,gif,webp}'], {
            destination: 'dist/assets/images/minified/',
            plugins: [imageminWebp({ quality: 86 })]
         });
         console.log('Images optimized with imagemin for Build');
      }
   };
}

export default defineConfig({
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@images': path.resolve(__dirname, './src/assets/images')
      }
   },
   plugins: [
      createHtmlPlugin(),
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
      imageminOptimizeBuild()
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
