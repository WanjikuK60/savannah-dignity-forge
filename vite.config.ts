import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // <--- Add this import

export default defineConfig({
  vite: {
    plugins: [
      nitro({
        preset: "netlify-static", // <--- This forces a purely static build for Netlify
      }),
    ],
  },
});
