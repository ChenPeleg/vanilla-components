import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'
import {exec} from 'node:child_process';

export default defineConfig({
    base: "",
    publicDir: "public",
    plugins: [
        tailwindcss(),
        {
            name: 'run-script-on-startup',
            configureServer() {
                exec('node scripts/run-on-startup.js', (err, _stdout, stderr) => {
                    if (err) {
                        console.error(`Error executing startup script: ${err}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`Startup script error output: ${stderr}`);
                    }

                });
            }
        },

        {
            name: 'run-script-on-change',
            handleHotUpdate({ file }) {
                // Add your script execution logic here
                exec(`node scripts/run-on-file-change.js "${file}" arg1 arg2`  , (err, _stdout, stderr) => {
                    if (err) {
                        console.error(`Error executing script: ${err}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`Script error output: ${stderr}`);
                    }
                    console.log(
                        _stdout
                    )
                });
            }
        }
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
