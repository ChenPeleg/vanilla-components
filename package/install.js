#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class VanillaElementsInstaller {
    static exclude = ['.git', 'node_modules', 'package.json', 'package-lock.json', 'package/install.js'];

    static copyRecursive(src, dest) {
        if (VanillaElementsInstaller.exclude.includes(path.basename(src))) return;
        if (fs.statSync(src).isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest);
            for (const file of fs.readdirSync(src)) {
                VanillaElementsInstaller.copyRecursive(path.join(src, file), path.join(dest, file));
            }
        } else {
            fs.copyFileSync(src, dest);
        }
    }

    /**
     * Run the installer to copy files from the package to the current working directory.
     * @param { string }customPath
     */
    static run(customPath = '') {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const sourceRoot = path.resolve(__dirname, '..');
        const destinationRoot = process.cwd();

        for (const item of fs.readdirSync(sourceRoot)) {
            VanillaElementsInstaller.copyRecursive(
                path.join(sourceRoot, item),
                path.join(destinationRoot, customPath, item)
            );
        }
    }
}

VanillaElementsInstaller.run();
