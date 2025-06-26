import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all", { prefix: "VITE_" }), svgr()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
