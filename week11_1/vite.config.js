import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use relative asset URLs so the built app works from the nested
  // /course-archive/week11_1/ path on GitHub Pages.
  base: "./",
  plugins: [react()]
});
