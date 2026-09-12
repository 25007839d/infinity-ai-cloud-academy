import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  base: "/",

  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },

  plugins: [
    react(),
    tailwindcss(),

    sitemap({
      hostname: "https://infinityaicloudacademy.com",

      dynamicRoutes: [
        "/",
        "/courses",
        "/roadmaps",
        "/projects",
        "/resources",
        "/about",
        "/contact",
        "/book-demo",
        "/privacy-policy",
        "/terms",
        "/student",
      ],
    }),
  ],
});