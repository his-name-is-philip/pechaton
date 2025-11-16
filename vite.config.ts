import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const certPath = path.resolve(__dirname, 'localhost.pem');
const keyPath = path.resolve(__dirname, 'localhost-key.pem');

export default defineConfig(({ command }) => ({
  server: {
    host: true,
    port: 8443,
    https: (fs.existsSync(certPath) && fs.existsSync(keyPath))
      ? {
          cert: fs.readFileSync(certPath),
          key: fs.readFileSync(keyPath)
        }
      : false
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  }
}));


