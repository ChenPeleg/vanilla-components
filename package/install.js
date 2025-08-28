#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class VanillaElementsInstaller {
    static exclude = ['.git', 'node_modules', 'package.json', 'package-lock.json', 'package/install.js'];

    /**
     * Recursively collect all files and folders to copy, excluding those in the exclude list.
     * @param {string} src
     * @param {string} dest
     * @param {Array} list
     */
    static collectItemsToCopy(src, dest, list) {
        if (VanillaElementsInstaller.exclude.includes(path.basename(src))) return;
        if (!fs.existsSync(src)) return;
        if (fs.statSync(src).isDirectory()) {
            // Add the directory itself
            list.push({ src, dest, isDir: true });
            for (const file of fs.readdirSync(src)) {
                VanillaElementsInstaller.collectItemsToCopy(path.join(src, file), path.join(dest, file), list);
            }
        } else {
            list.push({ src, dest, isDir: false });
        }
    }

    static copyItem(item) {
        if (item.isDir) {
            if (!fs.existsSync(item.dest)) fs.mkdirSync(item.dest, { recursive: true });
        } else {
            const parentDir = path.dirname(item.dest);
            if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
            fs.copyFileSync(item.src, item.dest);
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

        // Build the list of items to copy
        const itemsToCopy = [];
        for (const item of fs.readdirSync(sourceRoot)) {
            VanillaElementsInstaller.collectItemsToCopy(
                path.join(sourceRoot, item),
                path.join(destinationRoot, item),
                itemsToCopy
            );
        }
        // Copy all items
        for (const item of itemsToCopy) {
            VanillaElementsInstaller.copyItem(item);
        }
    }
}

VanillaElementsInstaller.run('template');
