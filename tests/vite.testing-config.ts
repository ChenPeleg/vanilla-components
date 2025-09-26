import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';
import fs from 'node:fs/promises';
import {testConstants} from './_tools/testConstants';

export default defineConfig(() => {
    const defaultConfig = {
        server: {
            port: testConstants.port,
        },

        base: '',
        publicDir: path.resolve(process.cwd(), 'public'),
        plugins: [tailwindcss(), {
            name: 'configure-response-headers',
            apply: 'serve',
            async transformIndexHtml() {
                const content = await fs.readFile('./tests/html/index.html', 'utf8');
                return {
                    html: content,
                    tags: []
                };


            },

        }

        ],
        define: {
            'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
            'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
        },
    }
    return defaultConfig as any


});
