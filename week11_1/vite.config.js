import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages project site path inside the course-archive repository.
  base: "/course-archive/week11_1/",
  plugins: [react()]
});
