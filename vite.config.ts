import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin("all", { prefix: "VITE_" }),
    svgr(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
