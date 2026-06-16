# Loyihalar — Local development

This project contains a Vite React frontend and a small Express backend for persisting a demo user and avatars.

Quick start

1. Install dependencies:

```bash
npm install
```

If `npm install` fails in PowerShell with an execution policy error, either run the command in Command Prompt (CMD) or allow scripts for the current user:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

2. Start both server and frontend (recommended):

```bash
npm run dev:all
```

This runs the Express server (http://localhost:4000) and the Vite dev server (usually http://localhost:5173) concurrently.

Alternatively start them separately:

```bash
# in one terminal
npm run start:server

# in another terminal
npm run dev
```

3. Verify server is running:

```bash
curl http://localhost:4000/api/current
# or open in browser: http://localhost:4000/api/current
```

Troubleshooting

- If you see `Failed to fetch` in the browser console:
  - Ensure `npm run start:server` is running and you see `Server listening on http://localhost:4000` in the terminal.
  - Make sure both servers are running on `localhost` and ports `5173` (vite) and `4000` (express) are not blocked by firewall.
  - If you use HTTPS for the frontend, use the Vite proxy (already configured) and run frontend with `npm run dev`.

- If `EADDRINUSE` appears, another process is using port 4000. Find and kill it:

```powershell
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

- If uploads don't show, check `public/uploads` for saved files and ensure the server created `data/users.json`.

If you prefer, paste server terminal output and browser Network details here and I'll help further.
