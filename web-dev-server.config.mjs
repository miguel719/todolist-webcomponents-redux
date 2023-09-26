import { hmrPlugin, presets } from "@open-wc/dev-server-hmr";
import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  rootDir: ".",
  nodeResolve: true, // This is the key setting for module resolution
  plugins: [
    esbuildPlugin({ ts: true }),
    hmrPlugin({
      include: ["src/**/*"],
      presets: [presets.lit],
    }),
  ],
};
