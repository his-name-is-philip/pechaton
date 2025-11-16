Local development & build

Commands (run in project root):

1. Install dev dependencies:

```bash
npm install
```

2. Build a production bundle `x-bundle.js` in the project root:

```bash
npm run build
```

3. Development (Vite dev server with HMR):

```bash
# HTTP dev (HMR)
npm run dev
# open http://localhost:5173 (Vite default) or http://localhost:8080 if using preview
```

3.a Development with HTTPS (uses local certs if present):

```bash
# start Vite dev server with HTTPS on port 8443
npm run dev:https
# open https://localhost:8443
```

4. Run only the static server:

```bash
npm run serve
```

5. HTTPS local server / dev with HTTPS (mkcert recommended)

Generate a local certificate (recommended: mkcert):

```bash
mkcert -install
mkcert localhost
```

Put the generated cert and key into the project root as `localhost.pem` and `localhost-key.pem` (or update names in `vite.config.ts` / `package.json`).

Then either:

- Use the lightweight http-server HTTPS command:

```bash
npm run serve:https
```

- Or start the Vite dev server with HTTPS (preferred for HMR):

```bash
npm run dev:https
# open https://localhost:8443
```

Notes
- The build produces `x-bundle.js` (ES module). `index.html` has been updated to load that file.
- Vite is used for local development with HMR; use `npm run dev` (HTTP) or `npm run dev:https` (HTTPS with certs) for fast iteration.
- Use `mkcert` to create locally trusted certificates for testing Service Workers, secure cookies or any feature requiring HTTPS.


