import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  base: "/",

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
      ],
    }),
  ],
});