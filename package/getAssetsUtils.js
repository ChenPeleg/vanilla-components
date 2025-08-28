import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { platform } from 'node:os';
import { exec } from 'child_process';
import * as readline from 'node:readline/promises'; // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';

import { rmSync } from 'node:fs';

class GetAssetsUtils {
    static async deleteFilesFromDir(directory = 'temp') {
        const dir = resolve(directory);
        try {
            rmSync(dir, { recursive: true, force: true });
            mkdirSync(dir, { recursive: true });
        } catch (e) {
            console.error(e);
        }
    }

    static async promptUserConsole(questionText) {
        const rl = readline.createInterface({ input, output });
        const answer = await rl.question(questionText);
        rl.close();
        return answer;
    }

    static async getLatestReleaseData(owner, repo) {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/releases/latest`
        );
        if (!response.ok)
            throw new Error(`unexpected response ${response.statusText}`);
        return await response.json();
    }

    static async getLatestRelease(releaseData) {
        const asset = releaseData.assets[0];
        return fetch(asset.browser_download_url);
    }

    static async execPromise(command, extraParams = {}) {
        return new Promise(function (resolve, reject) {
            exec(command, extraParams, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(stdout.trim());
            });
        });
    }
}

export default GetAssetsUtils;

export const runUnZipper = async (
    fileName = 'workbook',
    tempDir = 'temp',
    outDir = 'out'
) => {
    if (platform() === 'win32') {
        const psCommand = `Expand-Archive -Path ${resolve(tempDir)}/${fileName} -DestinationPath ${resolve(outDir)}`;
        await execPromise(psCommand, {
            cwd: tempDir,
            shell: 'powershell.exe',
        });
    } else {
        const psCommand = `cd ${resolve(tempDir)} && zip -r ${resolve(outDir)}/${fileName}.zip ./*`;
        const res = await execPromise(psCommand);
        console.info(res);
    }
};

export const copyFolderRecursively = async (source, target) => {
    if (!existsSync(resolve(target))) {
        mkdirSync(resolve(target), { recursive: true });
    }

    cpSync(source, target, { recursive: true });
};
