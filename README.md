On Linux, run the following commands to install dependencies:
- `npm install marked@4`
- `sudo apt install nodejs npm`
- `npm install --save-dev gh-pages@6.3.0`
- Then, test locally with:
```
npm run build
npx serve dist
```
It will then output:

```
   ┌───────────────────────────────────────────┐
   │                                           │
   │   Serving!                                │
   │                                           │
   │   - Local:    http://localhost:3000       │
   │   - Network:  http://192.168.100.1:3000   │
   │                                           │
   │   Copied local address to clipboard!      │
   │                                           │
   └───────────────────────────────────────────┘
```
- Deploy to GitHub Pages (publishes /dist folder to GitHub Pages) with:
```
npm run build
npx gh-pages -d dist
```
and then access it via: `https://1337fede.github.io/federico-bordoni-portfolio/`