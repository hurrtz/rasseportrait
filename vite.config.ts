import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/rasseportrait/",
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    viteCompression({
      algorithm: "gzip",
      compressionOptions: { level: 9 },
    }),
    viteCompression({
      algorithm: "brotliCompress",
      compressionOptions: { level: 11 },
    }),
  ],
});
