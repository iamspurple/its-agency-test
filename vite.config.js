import { defineConfig } from "vite";
import { resolve } from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import pugPlugin from "vite-plugin-pug";

const root = resolve(__dirname, "./");
const outDir = resolve(__dirname, "dist");

const options = { pretty: true };
const locals = { name: "My Pug" };

export default defineConfig({
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },

  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
    }),
    pugPlugin(options, locals),
    nodePolyfills(),
  ],

  root,

  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },

  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        test: resolve(root, "index.html"),
      },
      output: {
        assetFileNames: ({ name }) => {
          name = name.toLowerCase();

          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/styles/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
