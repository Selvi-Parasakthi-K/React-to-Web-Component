import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/random-picker-wc.ts",
    },
    // If you want a library-style single file, use lib option:
    // lib: { entry: 'src/random-picker-wc.ts', name: 'RandomPicker', fileName: 'random-picker' }
  },
});
