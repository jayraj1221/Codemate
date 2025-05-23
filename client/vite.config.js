import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 5000, // Increase limit to avoid warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Split dependencies into a separate file
          }
        }
      }
    }
  },
  plugins: [react()],
  define: {
    "process.env": {}, // Polyfill process.env
  },
});
