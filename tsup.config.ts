import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
    entry: ['src/index.ts'],
    onSuccess: options.watch ? "node dist/index.js" : undefined,
    format: ['cjs', 'esm'],
    clean: !options.watch,
    minify: !options.watch,
    dts: !options.watch,
    treeshake: !options.watch,
    shims: !options.watch,
}))
