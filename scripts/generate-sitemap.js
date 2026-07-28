import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import your course data
import { courses } from "../src/data/courses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://infinityaicloudacademy.com";

const staticPages = [
  {
    url: "/",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    url: "/courses",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    url: "/projects",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/roadmaps",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/resources",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    url: "/about",
    changefreq: "yearly",
    priority: "0.6",
  },
  {
    url: "/contact",
    changefreq: "yearly",
    priority: "0.6",
  },
  {
    url: "/privacy-policy",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    url: "/terms",
    changefreq: "yearly",
    priority: "0.3",
  },
];

const today = new Date().toISOString().split("T")[0];

const urls = [];

// Static pages
staticPages.forEach((page) => {
  urls.push(`
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
});

// Dynamic course pages
courses.forEach((course) => {
  urls.push(`
  <url>
    <loc>${SITE_URL}/courses/${course.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join("\n")}

</urlset>`;

const outputPath = path.join(__dirname, "../public/sitemap.xml");

fs.writeFileSync(outputPath, sitemap);

console.log("✅ sitemap.xml generated successfully!");