#!/usr/bin/env node

import {copyFileSync, existsSync, mkdirSync, readdirSync, statSync} from 'fs';
import {basename, dirname, join, resolve} from 'path';
import {fileURLToPath} from 'url';

class VanillaElementsInstaller {

    static include = ['.git', 'node_modules', 'package.json', 'package-lock.json',
                      'package/install.js'];

    /**
     * Recursively collect all files and folders to copy, excluding those in the exclude list.
     * @param {string} src
     * @param {string} dest
     * @param {Array} list
     */
    static collectItemsToCopy(src, dest, list) {
        if (VanillaElementsInstaller.include.includes(basename(src))) return;
        if (!existsSync(src)) return;
        if (statSync(src).isDirectory()) {
            // Add the directory itself
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
    static run(customPath = '') {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const sourceRoot = resolve(__dirname, '..');
        const destinationRoot = process.cwd();

        const itemsToCopy = [];
        console.log('copying files');
        for (const item of readdirSync(sourceRoot)) {
            VanillaElementsInstaller.collectItemsToCopy(join(sourceRoot, item), join(destinationRoot, customPath, item), itemsToCopy);
        }

        let spinnerIndex = 0;
        for (const item of itemsToCopy) {
            process.stdout.write(VanillaElementsInstaller.spinner[spinnerIndex]);
            spinnerIndex = (spinnerIndex + 1) % VanillaElementsInstaller.spinner.length;
            process.stdout.write(VanillaElementsInstaller.deleteChar);

             VanillaElementsInstaller.copyItem(item);
        }
    }
}

VanillaElementsInstaller.run('../template');
