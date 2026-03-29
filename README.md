# Holy Week Live - Streaming Platform

A React-based live streaming platform for church services.

## Deploy to Vercel (Free)

### Option 1: Deploy via Vercel Website (Easiest)

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com) and sign up/login

3. Click **"Add New Project"**

4. Import your repository

5. Vercel will auto-detect Vite settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Click **"Deploy"**

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

## Admin Access

Go to `/admin` and use password: `admin123`

## Free Tier Features on Vercel

- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ 100GB bandwidth/month
- ✅ Automatic previews for Git commits
- ✅ Fast builds