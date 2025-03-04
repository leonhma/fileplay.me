import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import type { ConfigEnv, UserConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import type { ManifestOptions } from "vite-plugin-pwa";

export default async function (config: ConfigEnv): Promise<UserConfig> {
  return {
    resolve: {
      alias: {
        "simple-peer": "simple-peer/simplepeer.min.js",
      },
    },
    plugins: [
      EnvironmentPlugin(["NODE_ENV"]),
      sveltekit(),
      SvelteKitPWA({
        srcDir: "src",
        filename: "service-worker.ts",
        registerType: "prompt",
        strategies: "injectManifest",
        useCredentials: true,
        devOptions: {
          enabled: false,
        },
        manifest: (await import(
          "./static/manifest.json"
        )) as Partial<ManifestOptions>,
      }),
    ],
    build: {
      rollupOptions: {
        external: [
          "/etc/nixos/fileplay-me-firebase-adminsdk-ehpoc-8f5289af8c.json",
        ],
      },
    },
    ssr: {
      noExternal: ["beercss"],
    },
  };
}
