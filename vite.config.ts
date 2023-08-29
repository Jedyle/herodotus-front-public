import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy(),
        tsconfigPaths()
    ],
    build: {
        outDir: 'build' // must match in Dockerfile
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    }
})
