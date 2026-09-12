# Hostinger Node.js setup — Infinity AI Cloud Academy

## Why the current 404 happens

The application source already contains `POST /api/demo-registrations` and `POST /api/admin/login`. If the browser receives Hostinger's normal HTML `404` page for both endpoints, the request is not reaching Express. This is a Node.js application/startup/routing configuration issue, not an SQL INSERT issue.

## Deploy settings

Use the Node.js website/application for `infinityaicloudacademy.com`. Do not deploy this as an Empty PHP/HTML/static website.

- Node.js: `22.x`
- Application root: project root (the folder containing `package.json` and `app.js`)
- Build command: `npm run build`
- Start command: `npm start`
- Startup/entry file, if Hostinger asks: `app.js`
- Output directory, if Hostinger asks: `dist`
- Port: let Hostinger provide `PORT`; do not hardcode a public port

After saving settings, redeploy/restart the application.

## Environment variables

Keep these in Hostinger Environment Variables:

```text
NODE_ENV=production
APP_URL=https://infinityaicloudacademy.com
PORT=<Hostinger-provided value, if required by the panel>
JWT_SECRET=<long random secret>
DB_HOST=localhost
DB_PORT=3306
DB_USER=<Hostinger database user>
DB_PASSWORD=<Hostinger database password>
DB_NAME=<Hostinger database name>
DB_CONNECTION_LIMIT=10
VITE_API_BASE_URL=/api
```

## Verify before login

Open these URLs after redeployment:

1. `https://infinityaicloudacademy.com/health` — should return JSON from Express.
2. `https://infinityaicloudacademy.com/api/ping` — should return JSON from Express.
3. `https://infinityaicloudacademy.com/api/health` — should return database `connected`.

Only after these work should you test:

- `/admin/login`
- `/book-demo`

If `/health` or `/api/ping` still shows Hostinger's HTML 404, the Node application is not attached/routed to the domain yet. Check Runtime Logs and the Node.js deployment settings; changing SQL data will not fix that 404.
