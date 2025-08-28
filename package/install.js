#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const exclude = ['.git', 'node_modules', 'package.json', 'package-lock.json', 'package/install.js'];

function copyRecursive(src, dest) {
    if (exclude.includes(path.basename(src))) return;
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        for (const file of fs.readdirSync(src)) {
            copyRecursive(path.join(src, file), path.join(dest, file));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const targetDir = process.cwd();

for (const file of fs.readdirSync(repoRoot)) {
    copyRecursive(path.join(repoRoot, file), path.join(targetDir, file));
}
