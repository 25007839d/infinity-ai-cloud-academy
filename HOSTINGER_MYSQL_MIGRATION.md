# Hostinger MySQL migration

## Architecture

Browser -> React/Vite -> Express API (`/api/*`) -> Hostinger MySQL

The browser must never connect directly to MySQL.

## hPanel

1. Open **Websites -> Dashboard -> Databases Management** for `infinityaicloudacademy.com`.
2. Create a MySQL database, username and password.
3. Keep the database host as `localhost` unless Hostinger shows a different value.
4. Open phpMyAdmin for the new database.
5. Import `db/schema.sql`.
6. In the Node.js website dashboard, add the environment variables from `.env.example` (without committing real values).
7. Generate a strong `JWT_SECRET`.
8. Redeploy.
9. Test `https://infinityaicloudacademy.com/api/health`.

## Create the first admin

Run locally or through SSH from the project root after the schema is imported:

```bash
ADMIN_EMAIL=admin@infinityaicloudacademy.com \
ADMIN_PASSWORD='CHANGE_THIS_TO_A_STRONG_PASSWORD' \
ADMIN_FULL_NAME='Infinity AI Admin' \
npm run seed:admin
```

If using Hostinger environment variables, set the three `ADMIN_*` variables temporarily and run the script, then remove them.

## Existing Supabase data

The current application uses Supabase Auth plus `admins` and `demo_registrations`. Password hashes from Supabase Auth should not be copied into the new `admins` table. Create a new Hostinger admin password with `seed:admin`.

For existing demo registrations, export the rows from Supabase and map them to the MySQL columns before import. Do not import the Supabase service-role key into the frontend.

## Production environment variables

```text
NODE_ENV=production
PORT=3000
APP_URL=https://infinityaicloudacademy.com
JWT_SECRET=<long-random-secret>
DB_HOST=localhost
DB_PORT=3306
DB_USER=<hostinger-db-user>
DB_PASSWORD=<hostinger-db-password>
DB_NAME=<hostinger-db-name>
DB_CONNECTION_LIMIT=10
VITE_API_BASE_URL=/api
```

Optional SMTP variables enable password-reset email delivery.
