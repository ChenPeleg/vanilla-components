#!/usr/bin/env node

import {copyFileSync, existsSync, mkdirSync, readdirSync, statSync} from 'fs';
import {basename, dirname, join, resolve} from 'path';
import {fileURLToPath} from 'url';

class VanillaElementsInstaller {
    static exclude = ['.git', 'node_modules',   'package-lock.json','web-types.json',
                      'package','.github', '.idea' ,'_tasks' ,'example-site'];

    /**
     * Recursively collect all files and folders to copy, excluding those in the exclude list.
     * @param {string} src
     * @param {string} dest
     * @param {Array} list
     */
    static collectItemsToCopy(src, dest, list) {
        if (VanillaElementsInstaller.exclude.includes(basename(src))) return;
        if (!existsSync(src)) return;
        if (statSync(src).isDirectory()) {
            list.push({src, dest, isDir: true});
            for (const file of readdirSync(src)) {
                VanillaElementsInstaller.collectItemsToCopy(join(src, file), join(dest, file), list);
            }
        } else {
            list.push({src, dest, isDir: false});
        }
    }

    static copyItem(item) {
        if (item.isDir) {
            if (!existsSync(item.dest)) mkdirSync(item.dest, {recursive: true});
        } else {
            const parentDir = dirname(item.dest);
            if (!existsSync(parentDir)) mkdirSync(parentDir, {recursive: true});
            copyFileSync(item.src, item.dest);
        }
    }

    /**
     * Run the installer to copy files from the package to the current working directory.
     * @param { string }customPath
     */
    static async run(customPath = '') {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const sourceRoot = resolve(__dirname, '..');
        const destinationRoot = process.cwd();

        const itemsToCopy = [];

        for (const item of readdirSync(sourceRoot)) {
            VanillaElementsInstaller.collectItemsToCopy(join(sourceRoot, item), join(destinationRoot, customPath, item), itemsToCopy);
        }

        // Copy all items
        for (const item of itemsToCopy) {
            VanillaElementsInstaller.copyItem(item);

        }

        console.log(`\nVanilla Elements files have been copied to ${join(destinationRoot, customPath)}`);
        console.log('You can now run "npm install" to install dependencies.');

        // Run the run-on-startup.js script in the destination folder
        const runOnStartupPath = join(destinationRoot, customPath, 'scripts', 'run-on-startup.js');
        if (existsSync(runOnStartupPath)) {
            // Use Node.js to run the script
            const { spawnSync } = await import('child_process');
            const result = spawnSync('node', [runOnStartupPath], { stdio: 'inherit' });
            if (result.error) {
                console.error('Error running run-on-startup.js:', result.error);
            }
        } else {
            console.warn(`run-on-startup.js not found at ${runOnStartupPath}`);
        }
    }
}

VanillaElementsInstaller.run('../template');
