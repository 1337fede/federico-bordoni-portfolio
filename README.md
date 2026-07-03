- On Windows, you have to download and install `Node.JS`
- Then, navigate to project folder and run:
`npx.cmd serve .` It will prompt you to install some packages and then output:

```
   ┌────────────────────────────────────────┐
   │                                        │
   │   Serving!                             │
   │                                        │
   │   - Local:    http://localhost:3000    │
   │   - Network:  http://10.5.0.2:3000     │
   │                                        │
   │   Copied local address to clipboard!   │
   │                                        │
   └────────────────────────────────────────┘
```

On Linux:

- `npm install marked@4`
- `sudo apt install nodejs npm`

```
npm run build
npx serve dist
```
- It will then output:
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
