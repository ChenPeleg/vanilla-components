// @ts-check

/**
 * Script to checkImports that all files with customElements.define are imported in the import file,
 * and that there are no extra imports. Provides debug logging and returns import status.
 * @module run-on-startup
 */

import {promises as fs} from 'node:fs';
import {join} from 'node:path';

export class RunOnStartup {

    static importFile = join('src', '_core', 'imported-components.ts');
    static srcDir = join(process.cwd(), 'src');
    #debug = false;

    /**
     * Recursively get all files in a directory.
     * @param {string} dir - Directory path
     * @returns {Promise<string[]>} Array of file paths
     */
    async getAllFiles(dir) {
        let files = [];
        const entries = await fs.readdir(dir, {withFileTypes: true});
        for (const entry of entries) {
            const fullPath =  join(dir, entry.name);
            if (entry.isDirectory()) {
                files = files.concat(await this.getAllFiles(fullPath));
            } else if (entry.isFile()) {
                files.push(fullPath);
            }
        }
        return files;
    }

    /**
     * Check if a file contains a specific string.
     * @param {string} filepath - File path
     * @param {string} searchString - String to search for
     * @returns {Promise<boolean>} True if found, else false
     */
    async fileContains(filepath, searchString) {
        const content = await fs.readFile(filepath, 'utf8');
        return content.includes(searchString);
    }

    /**
     * Build an import statement for a given file.
     * @param {string} file - File path
     * @returns {string} Import statement
     */
    buildImportStatement(file) {
        const relativePath = file.replaceAll('\\', '/').split('src/')[1].replace(/\\/g, '/');
        return `import '../${relativePath}';`;
    }

    /**
     * Get the content of a file as a string.
     * @param {string} filePath - File path
     * @returns {Promise<string>} File content
     */
    async getFileContent(filePath) {
        const data = await fs.readFile(filePath, 'utf8');
        return data.toString();
    }

    /**
     * Log info messages if debug is enabled.
     * @param {...any} args - Arguments to log
     */
    logInfo(...args) {
        if (this.#debug) {
            console.log(...args);
        }
    }

    /**
     * Log error messages if debug is enabled.
     * @param {...any} args - Arguments to log
     */
    logError(...args) {
        if (this.#debug) {
            console.error(...args);
        }
    }

    /**
     * Check that all files with customElements.define are imported, no extra imports exist, and no duplicates.
     * @returns {Promise<{importsCorrect: boolean, requiredImports: string[], duplicateImports: string[]}>} Result object
     */
    async checkImports() {
        try {
            this.logInfo('Starting checkImports for customElements.define imports...');
            const allFiles = await this.getAllFiles(RunOnStartup.srcDir);
            this.logInfo('All files found:', allFiles);
            const ceFiles = [];
            for (const file of allFiles) {
                if (file.endsWith('.ts') &&
                    await this.fileContains(file, 'customElements.define')) {
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
                    const absPath =  join(RunOnStartup.srcDir, relPath);
                    // Only checkImports .ts files inside src
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
            // Check for duplicate imports
            const importCount = {};
            for (const line of importLines) {
                importCount[line] = (importCount[line] || 0) + 1;
            }
            const duplicateImports = Object.entries(importCount)
                .filter(([_, count]) => count > 1)
                .map(([line]) => line);
            if (duplicateImports.length > 0) {
                this.logInfo('Duplicate imports found:', duplicateImports);
                console.log('Duplicate imports found:');
                duplicateImports.forEach(i => console.log(i));
            }
            const importsCorrect = missingImports.length === 0 && extraImports.length ===
                0 && duplicateImports.length === 0;
            if (importsCorrect) {
                this.logInfo('All customElements.define files are correctly imported, no extra or duplicate imports found.');
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
            return {importsCorrect, requiredImports, duplicateImports};
        } catch (err) {
            this.logError('Error in checkImports function:', err);
            console.error('Error in checkImports function:', err);
            process.exit(1);
        }
    }

    /**
     * Main function to check and fix imports if needed.
     * @returns {Promise<void>}
     */
    async main() {
        const result = await this.checkImports();
        if (!result.importsCorrect) {
            this.logInfo('Imports are incorrect. Rewriting import file...');
            const importFileHeader = "/**\n * This file is auto-generated. Do not edit manually.\n * @readonly\n * @module imported-components\n */\n";
            const newContent = importFileHeader + result.requiredImports.join('\n') +
                '\n';
            await fs.writeFile(RunOnStartup.importFile, newContent, 'utf8');
            this.logInfo('Import file has been rewritten.');
        } else {
            this.logInfo('Imports are correct. No changes needed.');
        }
    }
}

await new RunOnStartup().main();

