const path = require('path');
import { resolve } from "path";
import { defineConfig } from "vite";
const fs = require('fs');
import VitePluginCopy from "vite-plugin-copy";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html"
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html"
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html"
        ),
        productPagesIndex: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },

  plugins: [
    {
      name: 'copy-js-files', 
      async closeBundle() {
        const srcDir = path.resolve(__dirname, 'src/js');  
        const destDir = path.resolve(__dirname, 'dist/js'); 
        
        // Cria o diretório de destino se não existir
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // Lê todos os arquivos na pasta src/js
        const files = fs.readdirSync(srcDir);

        // Copia cada arquivo para a pasta dist/js
        files.forEach((file) => {
          const srcFilePath = path.join(srcDir, file);
          const destFilePath = path.join(destDir, file);
          fs.copyFileSync(srcFilePath, destFilePath); 
        });
      },
    },
  ],
});