# Option: Use GitHub as Your Database (Simplest Free Option)

Instead of an external database, you can edit your content directly in GitHub and Vercel will auto-redeploy.

## How It Works

1. Edit `src/data/content.json` in your GitHub repo
2. Commit the changes
3. Vercel automatically rebuilds and deploys
4. Changes are live within ~1 minute

## Workflow Options

### Option A: Edit Directly in GitHub (Easiest)

1. Go to your repo on GitHub
2. Navigate to `src/data/content.json`
3. Click the pencil icon to edit
4. Make changes and commit

### Option B: Use GitHub Web Editor (More Visual)

1. Go to your repo on GitHub
2. Press `.` (dot) to open GitHub Codespaces
3. Edit files in the browser
4. Commit changes directly

### Option C: Edit Locally + Push

```bash
# Make changes locally
npm run dev  # Preview changes

# Commit and push
git add src/data/content.json
git commit -m "Update site content"
git push
```

### Option D: Use GitHub CLI to Edit from Anywhere

```bash
# Pull latest
git pull

# Edit and push
vim src/data/content.json
git add src/data/content.json
git commit -m "Update content"
git push
```

## To Make Changes from the Admin Panel

Currently, the admin panel saves to localStorage. To also update GitHub:

1. Make changes in Admin Panel
2. Click **"Download Backup"** - saves content.json
3. Upload that file to your GitHub repo
4. Vercel auto-redeploys

## Comparison

| Method | Free | Real-time | Difficulty | Multi-user |
|--------|------|-----------|------------|------------|
| **localStorage only** | ✅ | ✅ | Easy | ❌ |
| **GitHub as DB** | ✅ | ~1 min | Easy | ✅ |
| **JSONBin.io** | ✅ | ✅ | Medium | ✅ |
| **Firebase** | ✅ | ✅ | Hard | ✅ |

## Recommended for You

**Keep it simple with GitHub as your database:**
1. Use the Admin panel to preview changes
2. Download backup when happy
3. Commit the JSON file to GitHub
4. Vercel handles the rest

This keeps everything free, versioned, and simple!
