// @ts-check
import { readdirSync, statSync, writeFile } from 'fs';
import path, { resolve as pathResolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import CONFIG from './config.js';
import SOLUTIONS from './solutions.js';

(async (CONFIG, SOLUTIONS) => {
  const { LANGS, INDEX_OUT_PATH, GITHUB_URL, PROJECT_DIRNAME } = CONFIG;

  const { solsMap } = SOLUTIONS;

  /** __filename */
  const __filename = fileURLToPath(import.meta.url);

  /** __dirname */
  const __dirname = dirname(__filename);

  /**
   *
   * @param {string} str
   * @param {number} size
   * @return {string}
   */
  function setToFit(str, size) {
    if (str.length > size) {
      str = str.slice(0, size - 3);
      str += '...'; // 省略
    }
    str = str + ''.padEnd(Math.max(size - str.length, 0), ' ');
    return str;
  }

  /**
   * 產生上半部的表格中的項目(item)
   *
   * @param {*} sol
   * @returns {string}
   */
  function getSolutionItem(sol) {
    if (sol) {
      /**
       * e.g :
       *    sol =
       *    {
       *       seq: '0001',
       *       name: 'p0001_twoSum.js',
       *       url: '/JS/HashMap/easy/p0001_twoSum.js',
       *       extension: 'js'
       *    },
       *
       *    -> solTag  = 'p0001_js',
       *
       *    -> solItem = '[✔][p0001_js]'
       */
      const solTag = `p${sol.seq}_${sol.extension}`;
      const itemStr = `[✔][${solTag}]`;
      return setToFit(itemStr, 15);
    } else {
      return setToFit('', 15);
    }
  }

  /**
   *
   * 產生對應表格中隱藏的Links。
   *
   * @param {*} sol
   * @returns {string}
   */
  function getSolutionLink(sol) {
    if (sol) {
      /**
       * e.g :
       *    sol =
       *    {
       *       seq: '0001',
       *       name: 'p0001_twoSum.js',
       *       url: '/JS/HashMap/easy/p0001_twoSum.js',
       *       extension: 'js'
       *    },
       *
       *    -> solTag  = 'p0001_js',
       *
       *    -> solLink = '[p0001_js]: https://github.com/nilswg/just-leetcode/blob/main//JS/HashMap/easy/p0001_twoSum.js'
       */
      const solTag = `p${sol.seq}_${sol.extension}`;
      const linkStr = `[${solTag}]: ${GITHUB_URL}${[sol.url]}\n`;
      return linkStr;
    } else {
      return '';
    }
  }

  let paras = ['', ''];
  paras[0] += `# just-leetcode

## 目 錄

| Title                                  | JavaScript    | Rust          |
|:---------------------------------------|:-------------:|:-------------:|\n`;

  for (const seq of Object.keys(solsMap)) {
    let solItems = [''];
    let solLinks = [''];

    LANGS.forEach(({ extension }) => {
      const sol = solsMap[seq][extension];
      /**
       * 設定 Items
       * e.g:
       *
       *    ['p0001_twoSum', '[✔][p0001_js]', '[✔][p0001_rs]' ]
       *
       * -> | p0001_twoSum  | [✔][p0001_js]  | [✔][p0001_rs] |
       *
       */
      if (sol?.name && solItems[0] === '') {
        solItems[0] = setToFit(sol.name, 40);
      }
      solItems.push(getSolutionItem(sol));
      /**
       * 設定 Links
       * e.g:
       *
       *  [ '<!-- 0001 -->', '[p0001_js]: ...', '[p0001_rs]: ...']
       *
       * ->  <!-- 0001 -->
       *     [p0001_js]: ...
       *     [p0001_rs]: ...
       */
      if (sol?.seq && solLinks[0] === '') {
        solLinks[0] = `<!-- ${sol.seq} -->\n`;
      }
      solLinks.push(getSolutionLink(sol));
    });
    paras[0] += '|' + solItems.join('|') + '|\n';
    paras[1] += solLinks.join('') + '\n';
  }

  const outdata = paras.join('\n');

  /**
   * save 儲存檔案
   */
  writeFile(path.join(__dirname, INDEX_OUT_PATH), outdata, function (err) {
    if (err) return console.log(err);
    console.log('\nAll work is finished successfully !');
  });
})(CONFIG, SOLUTIONS);
