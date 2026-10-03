# SQL Lab — Dedicated MySQL User

The SQL Lab must use its own database credentials.

## Hostinger environment variables

```env
DB_NAME=u776794897_infinity_ai
DB_USER=u776794897_academy_user
DB_PASSWORD=<academy-password>

SQL_LAB_DATABASE=u776794897_infinity_lab
SQL_LAB_USER=u776794897_user_infinity
SQL_LAB_PASSWORD=<lab-user-password>
SQL_LAB_CONNECTION_LIMIT=5
```

Do **not** change `DB_NAME` to the lab database. The main application connection must continue to use the Academy/LMS database.

## Hostinger setup

The database shown in hPanel as `u776794897_infinity_lab` is already paired with the dedicated user `u776794897_user_infinity`. Keep that pairing and use the user's password in `SQL_LAB_PASSWORD`.

Import `SQL_LAB_SEED.sql` into `u776794897_infinity_lab` after the user/database is ready, then restart the Node.js application.
