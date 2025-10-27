import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // bind to all interfaces
    port: 5173,       // default Vite port
    hmr: {
      protocol: "wss", 
      host: "refactored-space-adventure-69vqpp4rjx6j24rvg-5173.app.github.dev",
      port: 443        // Codespaces forwards HTTPS traffic automatically
    }
  }
});
