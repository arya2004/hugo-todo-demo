# Today — Hugo Todo Demo

A small, working todo app for demonstrating Hugo contribution rewards with merged GitHub pull requests. Add, complete, filter, delete and clear tasks. Data is saved in the browser's localStorage. No dependencies, database, API keys or dummy tasks are needed to run the app.

## Run

Install Node.js 22 or newer, then:

```sh
npm start
```

Open http://localhost:3001. Hugo can run alongside it on port 3000. `npm run dev` restarts the server when files change. Set `PORT` if you need another port.

## Push this as a separate GitHub repository

Create a public repository at https://github.com/new, then run from this folder:

```sh
git init -b main
git add .
git commit -m "Add todo app and Hugo post-merge integration"
git remote add origin https://github.com/YOUR_OWNER/YOUR_TODO_REPO.git
git push -u origin main
```

## Connect to Hugo

1. Deploy Hugo using its root README and set its backend environment values.
2. In Hugo's owner UI, register **this todo repository**, deploy/fund its Arc Testnet treasury, and Start Funding before merging the demo PR. This repository has its own numeric GitHub ID and treasury; registering the Hugo code repository does not register this one.
3. Open `https://github.com/YOUR_OWNER/YOUR_TODO_REPO/settings/secrets/actions` and add:
   - `POC_API_URL`: hosted Hugo origin, e.g. `https://YOUR_HUGO_APP.vercel.app`.
   - `POC_MERGE_TRIGGER_SECRET`: exactly the value of Hugo's backend `MERGE_TRIGGER_SECRET`.
4. The included `.github/workflows/post-merge.yml` collects merge/contributor/diff/review/CI data, posts it directly to Hugo, and waits for the synchronous response. It uses the automatic GitHub token. No checkout of PR code or central evaluator worker is needed.
5. For automatic payment, the contributing GitHub user must first link their embedded wallet on Hugo's `/redeem` page. Otherwise their eligible reward stays reserved until login and claim.

## Demonstrate a real contribution

Create a branch, implement an actual improvement, push it, and open a PR:

```sh
git switch -c feature/edit-tasks
# Implement and try an edit-task feature in public/app.js and public/index.html.
git add public
git commit -m "Allow editing task titles"
git push -u origin feature/edit-tasks
```

Merge the PR on GitHub, then open this repository's **Actions → Hugo — evaluate merged PR** run. The backend must already be reachable, have AI credits/keys, and have a funded treasury with funding active at merge time. Pushing directly to main does not trigger the workflow. Eligibility and the reward depend on the real evaluation; a merge does not guarantee payment.

Other useful demo contributions: task due dates, keyboard shortcuts, sorting, or a mobile layout improvement.

No remote repository, hosted deployment or payout is created merely by running this app locally.
