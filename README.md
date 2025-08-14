LeMemo Web (readonly notes view on web)
- Sign up (Display name, Discord ID, Password, Passcode)
- Discord ID validated and must be unique
- Sign in (Discord ID + Password)
- To view notes on web, user must enter their passcode (stored hashed)
- Bot can push notes via /api/bot/push-note with header x-bot-key

Setup:
1. copy .env.example -> .env.local and fill values
2. npm install
3. npm run dev
