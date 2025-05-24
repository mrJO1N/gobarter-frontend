import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@ui": resolve(__dirname, "src/ui"),
      "@comp": resolve(__dirname, "src/components"),
      "@view": resolve(__dirname, "src/views"),
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
});
