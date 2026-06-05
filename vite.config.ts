import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // This tells the Lovable builder to stop skipping the Nitro configuration
  nitro: true, 
  vite: {
    // Keep any other custom Vite plugins or configurations you already had below
    plugins: [],
  }
});
