import { promises as fs } from 'node:fs';
import path from 'node:path';

export class RunOnStartup {
    static importFile = path.join('src', 'imports', 'imported-components.ts');
    static srcDir = path.join(process.cwd(), 'src');

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
        console.log(file)

        const relativePath = file.replaceAll('\\','/').split('src/')[1].replace(/\\/g, '/');
        return `import '../${relativePath}';`;
    }

    async getFileContent(filePath) {
        const data = await fs.readFile(filePath, 'utf8');
        return data.toString();
    }

    async check() {
        const allFiles = await this.getAllFiles(RunOnStartup.srcDir);
        const ceFiles = [];
        for (const file of allFiles) {
            if (file.endsWith('.ts') && await this.fileContains(file, 'customElements.define')) {
                ceFiles.push(file);
            }
        }
        const importFileContent = await this.getFileContent(RunOnStartup.importFile);
        const missingImports = [];

        for (const file of ceFiles) {

            const importStatement = this.buildImportStatement(file);
            if (!importFileContent.includes(importStatement)) {
                missingImports.push(importStatement);
            }
        }
        if (missingImports.length === 0) {
            console.log('All customElements.define files are imported.');
        } else {
            console.log('Missing imports:');
            missingImports.forEach(i => console.log(i));
            process.exit(1);
        }
    }
}

new RunOnStartup().check().catch(err => {
    console.error(err);
    process.exit(1);
});
