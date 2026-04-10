# PM Interview Coach

An AI-powered PM interview prep tool built with the Anthropic Claude API.

**Live demo:** `https://YOUR-USERNAME.github.io/pm-coach`

## What it does

- Personalised onboarding — enter your background, role, target companies once
- Asks real PM interview questions tailored to you and your target company
- Scores your answer (X/10) with structured feedback: what worked, what was missing, sample strong answer
- Saves your session history and scores in your browser across sessions
- Works for any PM candidate — not just the original creator

## Question types supported

- Product Sense
- Metrics & Analytics
- Execution & RCA
- Behavioral
- Estimation
- AI & GenAI

## How to use

1. Open the live link above
2. Fill in your profile (name, background, target companies, API key)
3. Pick a company + question type → click **Ask new question**
4. Type your answer → get scored feedback instantly

## Your API key

You need a free Anthropic API key from [console.anthropic.com](https://console.anthropic.com).
Your key is stored **only in your own browser** (localStorage). It never touches any server.

## Deploy guide

Open **DEPLOY_GUIDE.html** in your browser for a complete visual step-by-step walkthrough covering all 3 platforms.

## Deploying your own copy

### Option A — GitHub Pages (frontend only, simplest)
The app works directly from GitHub Pages. Each user enters their own API key on the onboarding screen.

1. Fork this repo
2. Go to Settings → Pages → Deploy from `main` branch → `/ (root)`
3. Your live URL: `https://YOUR-USERNAME.github.io/pm-coach`

### Option B — With Cloudflare Worker proxy (hide your key, share with others)
Use this if you want to share the tool without requiring users to have their own API key.

1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) → Create Worker
2. Paste the contents of `cloudflare_worker.js`
3. Add a secret variable: `ANTHROPIC_API_KEY` = your `sk-ant-...` key
4. Deploy → copy your Worker URL
5. In `index.html`, find `const PROXY_URL = ''` and replace with your Worker URL
6. Commit and push

## Tech stack

- Pure HTML/CSS/JS — zero dependencies, zero build step
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- localStorage for profile + session history
- Optional Cloudflare Worker proxy

## Built by

[Mohit Gupta](https://linkedin.com/in/guptakmohit) — APM at Jupiter Money
