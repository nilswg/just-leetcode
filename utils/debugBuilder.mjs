//@ts-check
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import CONFIG from './config.mjs';
import SOLUTIONS from './solutions.mjs';
(async (CONFIG, SOLUTIONS) => {
  const { DEBUG_OUT_PATH } = CONFIG;

  const { solsMap } = SOLUTIONS;

  /** __filename */
  const __filename = fileURLToPath(import.meta.url);

  /** __dirname */
  const __dirname = dirname(__filename);

  /**這邊 Rust 的Debugs 直接跟Header寫在一起。 */
  const header = `
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug rust",
      "request": "launch",
      "program": "\${workspaceFolder}\\\\Rust\\\\target\\\\debug\\\\rs_leetcode",
      "sourceLanguages": ["rust"],
      "args":[],
      "type": "lldb"
    },
    {
      "name": "Release rust",
      "request": "launch",
      "program": "\${workspaceFolder}\\\\Rust\\\\target\\\\release\\\\rs_leetcode",
      "sourceLanguages": ["rust"],
      "args":[],
      "type": "lldb"
    }
`;

  /**產生 JS 的Debugs */
  let jsDebugs = [''];
  for (const seq of Object.keys(solsMap)) {
    const sol = solsMap[seq]['js'];
    const url = sol.url;
    const item = `
    {
      "name": "Launch ${sol.name}",
      "program": "\${workspaceFolder}${url.replace(/\//g, '\\\\')}",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    }`;
    jsDebugs.push(item);
  }

  /**拼接出完整Debugs文件 */
  const outdata = header + jsDebugs.join(',') + ']\n' + '}';

  /**
   * 將DEBUG_OUT_PATH的最後一筆作為filename，除最後一筆外作為folderPaths
   * e.g
   *
   *  DEBUG_OUT_PATH : '../.vscode/test/launch.json'
   *
   *  after splice,
   *  -> paths = [ '..', '.vscode', 'test']
   *     filename = 'launch.json'
   * */
  const paths = DEBUG_OUT_PATH.split('/');
  const filename = paths.splice(paths.length - 1, 1);

  /**
   * 假如該路徑不存在，就動態地建立資料夾，並返回此路徑，folderPath
   *
   * e.g :
   *
   *     paths = [ '..', '.vscode', 'test']
   *
   *  -> create Folder:>  D:\dev\just-leetcode
   *     create Folder:>  D:\dev\just-leetcode\.vscode
   *     create Folder:>  D:\dev\just-leetcode\.vscode\test
  */
  const folderPath = paths.reduce((prev, curr) => {
    if (prev === '') {
      prev = path.join(__dirname, curr);
    } else {
      prev += `\\${curr}`;
    }
    try {
      console.log('create Folder:> ', prev);
      if (!fs.existsSync(prev)) {
        fs.mkdirSync(prev);
      }
    } catch (err) {
      console.error(err);
    }
    return prev;
  }, '');

  /** 儲存檔案 */
  fs.writeFile(`${folderPath}\\${filename}`, outdata, function (err) {
    if (err) return console.log(err);
    console.log('\nAll work is finished successfully !');
  });
})(CONFIG, SOLUTIONS);
