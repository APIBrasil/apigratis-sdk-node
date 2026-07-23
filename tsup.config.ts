import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		core: 'src/core/index.ts',
		messaging: 'src/services/messaging/index.ts',
		data: 'src/services/data/index.ts',
		platform: 'src/services/platform/index.ts',
		legacy: 'src/legacy/index.ts',
	},
	format: ['cjs', 'esm'],
	dts: true,
	sourcemap: true,
	clean: true,
	target: 'node18',
	outDir: 'dist',
});
