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
export ASSETS_DIR="/media/fede-ubuntu/STORAGE1/CW/_assets"

docker build \
  --build-context external-assets="$ASSETS_DIR" \
  --target production \
  -t federico-bordoni-portfolio . \
&& docker run --rm \
  --name federico-bordoni-portfolio \
  -p 3000:80 \
  federico-bordoni-portfolio
```
- Open http://localhost:3000` to see website
- What happens when your assets change? The running container will not automatically update because the data was read when the image was built. You must rebuild the image to incorporate those changes.
- GitHub Pages serves the static files published to the configured publishing source. Deploy to GitHub Pages (publishes /dist folder to GitHub Pages) running locally:
```
npm run build
npx gh-pages -d dist
```
- Access it via: `https://1337fede.github.io/federico-bordoni-portfolio/`