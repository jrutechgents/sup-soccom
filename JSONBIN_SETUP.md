# Setting Up JSONBin.io for Persistent Data

JSONBin.io provides a free JSON storage service that works great with static sites like Vercel.

## Step 1: Create JSONBin Account

1. Go to [jsonbin.io](https://jsonbin.io)
2. Sign up for a free account
3. Go to your API Keys section
4. Copy your **X-Master-Key**

## Step 2: Create a New Bin

1. Click **"Create a Bin"**
2. Paste your content (or use the default)
3. Click **"Create"**
4. Copy your Bin ID (the part after `/b/` in the URL)

Example URL: `https://api.jsonbin.io/v3/b/65f4d32165e34332a1b2c3ab/latest`
Your Bin ID: `65f4d32165e34332a1b2c3ab`

## Step 3: Set Environment Variables on Vercel

1. Go to your Vercel Project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Name | Value |
|------|-------|
| `VITE_JSONBIN_URL` | `https://api.jsonbin.io/v3/b/YOUR_BIN_ID/latest` |
| `VITE_JSONBIN_KEY` | Your X-Master-Key |

4. Click **Save**
5. **Redeploy** your project

## Step 4: Update Your Code

Replace the import in your components:

```typescript
// OLD
import { useContent } from '../../hooks/useContent';

// NEW (after you uncomment the line in useContentJsonBin.ts)
import { useContentJsonBin } from '../../hooks/useContentJsonBin';
```

## Free Tier Limits (JSONBin.io)

- ✅ 10 requests/day (free tier)
- ✅ 3 bins
- ✅ 50KB storage per bin
- ✅ Perfect for admin content updates

## Alternative Free Options

### 1. Firebase Realtime Database (Free 1GB/day)
- More generous limits
- Real-time sync
- More complex setup

### 2. Supabase (Free 500MB)
- Full PostgreSQL database
- Authentication included
- More powerful but more complex

### 3. Keep Using localStorage Only
- Works fine for single admin
- Just remember to **Download Backup** before clearing browser
