import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    define: {
        'import.meta.env.VITE_BUILD_DATE': JSON.stringify(
            new Date().toISOString()
        ),
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(
            process.env.npm_package_version
        ),
    },
});
