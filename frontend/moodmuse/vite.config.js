import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // bind to 0.0.0.0 automatically
    port: 5173,      // default Vite port
    strictPort: false,
    hmr: {
      protocol: "ws",   // WebSocket
      host: "0.0.0.0",  // bind to all interfaces
      port: 5173
    }
  }
});
