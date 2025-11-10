import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ This configuration allows YouTube, Google Drive & external videos
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    cors: true,
    headers: {
      "Content-Security-Policy":
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://drive.google.com data: blob:;",
    },
  },
  preview: {
    port: 4173,
    headers: {
      "Content-Security-Policy":
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://drive.google.com data: blob:;",
    },
  },
});
