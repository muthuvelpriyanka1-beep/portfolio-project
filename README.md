# Portfolio Project

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Seed Data (Projects + Skills)

`seed.js` now inserts data directly into the same `projects` and `skills` collections used by the frontend APIs.

```bash
cd backend
npm run seed
```

> Important: run this against the same MongoDB URI used by your deployed backend.


## Frontend Environment Files

- `frontend/.env.development` is used for local development (`http://localhost:5000`).
- `frontend/.env` intentionally leaves `REACT_APP_API` empty so production does **not** accidentally call localhost.
- In Vercel, set `REACT_APP_API` in Project Settings → Environment Variables.

## Deployment Notes (Render + Vercel)

1. Set `MONGO_URI` in Render backend environment variables.
2. Seed the deployed database (using that same `MONGO_URI`).
3. Set `REACT_APP_API` in Vercel to your Render backend URL, for example:
   ```
   https://your-backend.onrender.com
   ```
4. Redeploy frontend after setting env vars.

If `REACT_APP_API` is missing or points to localhost, frontend requests will fail in production.
