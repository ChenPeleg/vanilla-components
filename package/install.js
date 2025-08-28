#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class Installer {
    static exclude = ['.git', 'node_modules', 'package.json', 'package-lock.json', 'package/install.js'];

    static copyRecursive(src, dest) {
        if (Installer.exclude.includes(path.basename(src))) return;
        if (fs.statSync(src).isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest);
            for (const file of fs.readdirSync(src)) {
                Installer.copyRecursive(path.join(src, file), path.join(dest, file));
            }
        } else {
            fs.copyFileSync(src, dest);
        }
    }

    static run() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const repoRoot = path.resolve(__dirname, '..');
        const targetDir = process.cwd();

        for (const file of fs.readdirSync(repoRoot)) {
            Installer.copyRecursive(path.join(repoRoot, file), path.join(targetDir, file));
        }
    }
}

Installer.run();
