import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Pass a function to defineConfig to access the build environment details
export default defineConfig(({ ssrBuild }) => ({
  vite: {
    plugins: [
      nitro({
        preset: "netlify-static",
      }),
    ],
    build: {
      // If it's an SSR build, clear the input so Nitro can handle it.
      // Otherwise, keep your custom client configuration.
      rollupOptions: ssrBuild 
        ? undefined 
        : {
            input: {
              main: "index.html",
            },
          },
    },
  },
}));
