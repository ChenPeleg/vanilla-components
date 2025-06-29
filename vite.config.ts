import {defineConfig} from 'vite';

export default defineConfig({

    define: {
        'import.meta.env.VITE_BUILD_DATE': JSON.stringify(
            new Date().toISOString()
        ),
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(
            process.env.npm_package_version
        ),
    },
});
