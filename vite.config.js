const path = require('path');
import { resolve } from "path";
import { defineConfig } from "vite";
const fs = require('fs');
import VitePluginCopy from "vite-plugin-copy";

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product1: resolve(__dirname, 'src/product_pages/cedar-ridge-rimrock-2.html'),
        product2: resolve(__dirname, 'src/product_pages/marmot-ajax-3.html'),
        product3: resolve(__dirname, 'src/product_pages/northface-alpine-3.html'),
        product4: resolve(__dirname, 'src/product_pages/northface-talus-4.html'),
        productPagesIndex: resolve(__dirname, 'src/product_pages/index.html'),
        backpacksJson: resolve(__dirname, 'src/json/backpacks.json'),
        sleepingBagsJson: resolve(__dirname, 'src/json/sleeping-bags.json'),
        tentsJson: resolve(__dirname, 'src/json/tents.json'),
      },
    },
  },

 plugins: [
    VitePluginCopy({
      targets: [
        {
          src: 'src/json/*',
          dest: 'dist/json'
        },
      ],
    }),

    {
      name: 'copy-js-files',
      async closeBundle() {
        const srcDir = path.resolve(__dirname, 'src/js');
        const destDir = path.resolve(__dirname, 'dist/js');
        
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const files = fs.readdirSync(srcDir);
        files.forEach((file) => {
          const srcFilePath = path.join(srcDir, file);
          const destFilePath = path.join(destDir, file);
          fs.copyFileSync(srcFilePath, destFilePath);
        });
      },
    },
  ],
});