# Hostinger build fix

The Hostinger deployment can install production dependencies only. Vite and @vitejs/plugin-react are therefore kept in `dependencies`, not `devDependencies`.

The Vite sitemap plugin was removed because `npm run build` already runs `node scripts/generate-sitemap.js`, which generates `public/sitemap.xml`.

Build command:
```
npm run build
```

Start command:
```
npm start
```
