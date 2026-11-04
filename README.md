- How it works:
```
External assets ──────────┐
                          │
Source code ──────────────┤
                          ▼
                 ┌─────────────────┐
                 │  Node.js image  │
                 │                 │
                 │  npm ci         │
                 │  npm run build  │
                 └────────┬────────┘
                          │
                          ▼
                        dist/
                          │
                 ┌────────┴────────┐
                 │                 │
                 ▼                 ▼
        ┌────────────────┐  ┌─────────────────┐
        │  Nginx image   │  │  npx gh-pages   │
        │                │  │      -d dist    │
        │  Serve website │  └────────┬────────┘
        └────────┬───────┘           │
                 │                   ▼
                 ▼             gh-pages branch
      http://localhost:3000          │
                                     ▼
                               GitHub Pages
                                     │
                                     ▼
              https://1337fede.github.io/federico-bordoni-portfolio/
```
- Build and run locally with:
```
bash build.sh
```
- Open http://localhost:3000` to see website
- What happens when your assets change? The running container will not automatically update because the data was read when the image was built. You must rebuild the image to incorporate those changes.
- You need to install `node.js` as a development dependency in your project. If you haven't installed it yet, download and install it from: `https://nodejs.org/en/download`, and then run: 
```
npm install
npm install --save-dev gh-pages
```
- GitHub Pages serves the static files published to the configured publishing source. Deploy to GitHub Pages (publishes /dist folder to GitHub Pages) running locally:
```
npm run build
npx gh-pages -d dist
```
- Access it via: `https://1337fede.github.io/federico-bordoni-portfolio/`
- If you cannot acces the folder, remmber the repo has to be public and niot private and check that in `Settings → Pages` the publishing source is `gh-pages → / (root)`