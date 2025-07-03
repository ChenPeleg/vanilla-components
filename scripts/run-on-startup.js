// @ts-check
/**
 * Script to check that all files with customElements.define are imported in the import file,
 * and that there are no extra imports. Provides debug logging and returns import status.
 * @module run-on-startup
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

export class RunOnStartup {

    static importFile = path.join('src', 'imports', 'imported-components.ts');
    static srcDir = path.join(process.cwd(), 'src');
    #debug = true;

    async getAllFiles(dir) {
        let files = [];
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                files = files.concat(await this.getAllFiles(fullPath));
            } else if (entry.isFile()) {
                files.push(fullPath);
            }
        }
        return files;
    }

    async fileContains(filepath, searchString) {
        const content = await fs.readFile(filepath, 'utf8');
        return content.includes(searchString);
    }

    buildImportStatement(file) {
        const relativePath = file.replaceAll('\\','/').split('src/')[1].replace(/\\/g, '/');
        return `import '../${relativePath}';`;
    }

    async getFileContent(filePath) {
        const data = await fs.readFile(filePath, 'utf8');
        return data.toString();
    }

    logInfo(...args) {
        if (this.#debug) {
            console.log(...args);
        }
    }

    logError(...args) {
        if (this.#debug) {
            console.error(...args);
        }
    }

    async check() {
        try {
            this.logInfo('Starting check for customElements.define imports...');
            const allFiles = await this.getAllFiles(RunOnStartup.srcDir);
            this.logInfo('All files found:', allFiles);
            const ceFiles = [];
            for (const file of allFiles) {
                if (file.endsWith('.ts') && await this.fileContains(file, 'customElements.define')) {
                    this.logInfo('File with customElements.define found:', file);
                    ceFiles.push(file);
                }
            }
            const importFileContent = await this.getFileContent(RunOnStartup.importFile);
            this.logInfo('Import file content loaded.');
            const missingImports = [];
            const extraImports = [];
            const requiredImports = ceFiles.map(file => this.buildImportStatement(file));
            // Find missing imports (files with customElements.define not imported)
            for (const file of ceFiles) {
                const importStatement = this.buildImportStatement(file);
                this.logInfo('Checking if import exists for:', importStatement);
                if (!importFileContent.includes(importStatement)) {
                    this.logInfo('Missing import:', importStatement);
                    missingImports.push(importStatement);
                }
            }
            // Find extra imports (imported files that do not contain customElements.define)
            const importLines = importFileContent.split('\n').map(l => l.trim()).filter(l => l.startsWith('import'));
            for (const line of importLines) {
                // Extract the relative path from the import statement
                const match = line.match(/import ['"]\.\.\/(.*)['"]/);
                if (match) {
                    const relPath = match[1];
                    const absPath = path.join(RunOnStartup.srcDir, relPath);
                    // Only check .ts files inside src
                    if (absPath.endsWith('.ts')) {
                        this.logInfo('Checking if extra import:', absPath);
                        // If this file does not contain customElements.define, it's extra
                        if (!ceFiles.includes(absPath)) {
                            this.logInfo('Extra import found:', line);
                            extraImports.push(line);
                        }
                    }
                }
            }
            const importsCorrect = missingImports.length === 0 && extraImports.length === 0;
            if (importsCorrect) {
                this.logInfo('All customElements.define files are correctly imported, and no extra imports found.');
                console.log('All customElements.define files are correctly imported, and no extra imports found.');
            } else {
                if (missingImports.length > 0) {
                    this.logInfo('Missing imports:', missingImports);
                    console.log('Missing imports:');
                    missingImports.forEach(i => console.log(i));
                }
                if (extraImports.length > 0) {
                    this.logInfo('Extra imports (should be removed):', extraImports);
                    console.log('Extra imports (should be removed):');
                    extraImports.forEach(i => console.log(i));
                }
            }
            return { importsCorrect, requiredImports };
        } catch (err) {
            this.logError('Error in check function:', err);
            console.error('Error in check function:', err);
            process.exit(1);
        }
    }
}

new RunOnStartup().check().catch(err => {
    console.error(err);
    process.exit(1);
});
