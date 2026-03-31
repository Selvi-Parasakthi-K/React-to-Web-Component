import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/random-picker-wc.ts",
      name: "RandomPicker",
      fileName: "random-picker",
      formats: ["es"],
    },
    cssCodeSplit: false,
  },
});
