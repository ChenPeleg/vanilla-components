#!/usr/bin/env node

import {copyFileSync, existsSync, mkdirSync, readdirSync, statSync} from 'fs';
import {basename, dirname, join, resolve} from 'path';
import {fileURLToPath} from 'url';
import {renameSync} from 'node:fs';

// Parse optional CLI argument for location
const locationArg = process.argv[2] || '';

class VanillaElementsInstaller {
    exclude = ['node_modules', 'package-lock.json', 'web-types.json','.git', 'package',
               '.github', '.idea', '_tasks', 'example-site'];


    constructor(customDestenationPath = '') {

        this.currentCliRoute = process.cwd();
        this.sourceRoot = this.buildSourceRoot();
        this.customDestinationPath = this.validateAndSetCustomPath(customDestenationPath);
        console.log(  this.customDestinationPath, this.sourceRoot, this.currentCliRoute);
    }

     buildSourceRoot() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        return resolve(__dirname, '..');
    }

    validateAndSetCustomPath(customPathFromArgs) {

        const fullDestination = resolve(this.currentCliRoute, customPathFromArgs);
        if ((fullDestination !== this.sourceRoot &&
            (fullDestination.startsWith(this.sourceRoot + '\\') ||
                fullDestination.startsWith(this.sourceRoot + '/')))) {
            return '../template';
        }
        return customPathFromArgs;
    }

    renameNpmIgnoreToGitIgnore() {
        const npmignorePath = join(this.currentCliRoute, this.customDestinationPath, '.npmignore');
        const gitignorePath = join(this.currentCliRoute, this.customDestinationPath, '.gitignore');
        if (existsSync(npmignorePath)) {
            renameSync(npmignorePath, gitignorePath);
        }
    }

    /**
     * Recursively collect all files and folders to copy, excluding those in the exclude list.
     * @param {string} src
     * @param {string} dest
     * @param {Array} list
     */
    collectItemsToCopy(src, dest, list) {
        if (this.exclude.includes(basename(src))) return;
        if (!existsSync(src)) return;
        if (statSync(src).isDirectory()) {
            list.push({src, dest, isDir: true});
            for (const file of readdirSync(src)) {
                this.collectItemsToCopy(join(src, file), join(dest, file), list);
            }
        } else {
            list.push({src, dest, isDir: false});
        }
    }

    copyItem(item) {
        if (item.isDir) {
            if (!existsSync(item.dest)) mkdirSync(item.dest, {recursive: true});
        } else {
            const parentDir = dirname(item.dest);
            if (!existsSync(parentDir)) mkdirSync(parentDir, {recursive: true});
            copyFileSync(item.src, item.dest);
        }
    }


    async run() {

        const sourceRoot =  this.sourceRoot
        const itemsToCopy = [];
        for (const item of readdirSync(sourceRoot)) {
            this.collectItemsToCopy(join(sourceRoot, item), join(this.currentCliRoute, this.customDestinationPath, item), itemsToCopy);
        }

        for (const item of itemsToCopy) {
            this.copyItem(item);
        }
        this.renameNpmIgnoreToGitIgnore();
        this.runStartupScript();
    }

    runStartupScript() {
        const runOnStartupPath = join(this.currentCliRoute, this.customDestinationPath, 'scripts', 'run-on-startup.js');
        if (existsSync(runOnStartupPath)) {
            import('child_process').then(({spawnSync}) => {
                const runDir = join(this.currentCliRoute, this.customDestinationPath);
                spawnSync('node', [runOnStartupPath, '--quiet'], {
                    stdio: 'inherit', cwd: runDir
                });
            });
        }
    }
}

const installer = new VanillaElementsInstaller(locationArg);
installer.run().then();
