// @ts-check
/**
 * Script to add import statements for files with customElements.define on file change.
 * @module run-on-file-change
 */

import {appendFile, promises} from 'node:fs';
import {join} from 'node:path';

export class RunOnFileChange {
    static importFile = join('src', '_core', 'imported-components.ts');

    async addStringToFile(filePath, content) {

        try {
            await appendFile(filePath, content, () => {

            });
        } catch (error) {
            console.error(`Error adding '${content}' to ${filePath}:`, error);
        }
    }

    buildImportStatement = (fileChanged) => {
        const relativePath = fileChanged.split('src/')[1];
        return `import '../${relativePath}';`;

    };

    getFileContent = async (filePath) => {
        try {
            const data = await promises.readFile(filePath, () => {

            });

            return data.toString('utf8');
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
        }
    };

    runOnFileChange = async () => {

        const fileChanged = process.argv[2];
        const changedFileResult = await this.getFileContent(fileChanged);
        if (changedFileResult.includes('run-on-file-change') ||
            !changedFileResult.includes('customElements.define')) {
            return;
        }
        const statement = this.buildImportStatement(fileChanged);
        const importFilePath = RunOnFileChange.importFile;
        const importFileContent = await this.getFileContent(importFilePath);
        if (importFileContent.includes(statement) || statement.includes('undefined')) {
            return;
        }
        await this.addStringToFile(importFilePath, `${statement}\n`);


    };
}

new RunOnFileChange().runOnFileChange().then();
