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

- Backend now auto-seeds default Projects/Skills on startup **only if collections are empty**.

`seed.js` now inserts data directly into the same `projects` and `skills` collections used by the frontend APIs.

```bash
cd backend
npm run seed
```

> Important: run this against the same MongoDB URI used by your deployed backend.


### If you cannot run Node commands

You can trigger seeding through the deployed backend API (no local Node needed):

```bash
curl -X POST "https://your-backend.onrender.com/api/admin/seed" \
  -H "x-seed-key: YOUR_SEED_API_KEY"
```

To force reset/reseed:

```bash
curl -X POST "https://your-backend.onrender.com/api/admin/seed?force=true" \
  -H "x-seed-key: YOUR_SEED_API_KEY"
```

Set `SEED_API_KEY` in Render environment variables before using this endpoint.


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


## Debugging data issues

If seeded data is not visible in frontend:

1. Open backend health endpoint:
   - `GET /api/health`
2. Temporarily enable debug logs in backend env:
   - `DEBUG_LOGS=true`
3. Check debug DB stats endpoint:
   - `GET /api/debug/db-stats`
4. In browser devtools console, verify `[API DEBUG]` logs and request URL.


5. Verify backend root URL returns JSON (not 404):
   - `GET /`

Frontend home page now includes an API debug banner that shows configured API base and backend health status.

> Note: Home section content is static. Seeded MongoDB data appears in **Skills** and **Projects** sections.


If you see `304` for `/api/projects` or `/api/skills`, that is an HTTP cache response (not server failure). APIs now return no-cache headers and frontend requests use `cache: "no-store"` to force fresh data checks.

