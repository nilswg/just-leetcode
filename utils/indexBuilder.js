// @ts-check
import { readdirSync, statSync, writeFile } from 'fs';
import path, { resolve as pathResolve, dirname } from 'path';
import { fileURLToPath } from 'url';

(async () => {
  /** __filename */
  const __filename = fileURLToPath(import.meta.url);

  /** __dirname */
  const __dirname = dirname(__filename);

  /** LANGS 描述將被作為產生目錄的語言目錄位置等資訊。 */
  const LANGS = [
    { lang: 'JavaScript', url: '../JS', extension: 'js' },
    { lang: 'Rust', url: '../Rust', extension: 'rs' },
  ];

  const OUT_PATH = '../README.md';

  /** GITHUB_URL 對應GitHub上的根目錄網址 */
  const GITHUB_URL = `https://github.com/nilswg/just-leetcode/blob/main/`;

  /**
   * 專案目錄名稱
   */
  const PROJECT_DIRNAME = 'just-leetcode';

  /**
   * 搜尋當前路徑下的所有內容，返回所有檔案路徑。
   * @param {string} dir
   * @returns {string[]}
   */
  function getFileUrls(dir) {
    return readdirSync(dir).flatMap((item) => {
      /**
       * 產生新的路徑。
       */
      const path = pathResolve(dir, item);

      /**
       * 檢查該路徑下的對象是否是一個目錄
       */
      const isDirectory = statSync(path).isDirectory();

      /**
       * 如果仍是一個目錄，則繼續執行；反之則是一個檔案，直接返回檔案的路徑。
       */
      if (isDirectory) {
        return getFileUrls(path);
      } else {
        return path;
      }
    });
  }

  /**
   *
   * @param {string} fullFileName 完整的檔案名
   * @param {string} extension 檔案的副檔名
   */
  const isValidFileName = (fullFileName, extension) => {
    /**
     * 作為有效的檔名，其規則如下:
     *
     * 由p開頭，再加上4位的數字形成檔頭識別碼，隨後是任意的題目標題，最後以副檔名結尾(e.g: .js)
     *
     * e.g : 'p0001_TwoSum.js'
     *
     * e.g : 'p0003_length_of_longest_substring.rs'
     *
     */
    const re = `p\[0\-9\]\+_\[\\w\]\+\.${extension}`;
    const isOk = new RegExp(re).test(fullFileName);

    return isOk;
  };

  /**
   * 根據檔案名，取其識別碼的數字部分為序號(Sequence Number)，方便查找。
   *
   * e.g 'p0001_TwoSum.js' -> '0001'
   *
   * e.g 'p0003_length_of_longest_substring.rs' -> '0003'
   *
   * @param {string} fullFileName
   * @returns string
   */
  const getSeqNumber = (fullFileName) => {
    return fullFileName.match(/[0-9]{4}/)[0];
  };

  /**
   * 於目錄表下方處，產生對應的隱藏超連結。
   *
   * @param {string} url 相對於根目錄下的目錄位置。
   * @returns {string}
   */
  const genHrefString = (url) => {
    /**
     * e.g  url: 'd:/dev/just-leetcode/JS/p0001_TwoSum.js'
     *
     *      -> relativeFilePath: '/JS/p0001_TwoSum.js'
     *
     */
    const relativeFilePath = url.split(`${PROJECT_DIRNAME}`)[1];

    return relativeFilePath;
  };

  /**
   *
   * @param {string} dir
   * @param {string} extension
   */
  function searchSolutionsUnderFolder(dir, extension) {
    /**
     * 取得該目錄中的所有檔案名
     */
    let fileUrls = getFileUrls(dir);
    /**
     * 移除 "."，或將其轉換為小寫。
     *
     * e.g : ".js" -> "js"
     *
     * e.g : ".JS" -> "js"
     */
    extension = extension.replace(/\./g, '').toLowerCase();

    const results = fileUrls
      .map((url) => {
        /**
         * 將路徑以 '\\' 切分割後得到多個字段(text)。
         *
         * e.g  url: "just-leetcode\\JS\\p0018_fourSum.js"
         *
         *          -> texts: [ "just-leetcode", "JS", "p0018_fourSum.js" ]
         */
        const texts = url.split('\\');

        /**
         * 取字段的最後一個，就是其完整檔案名。
         */
        const fullFileName = texts[texts.length - 1];

        if (!isValidFileName(fullFileName, extension)) {
          return null; // 無效的對象將作為 null 返回，並被filter過濾。
        }

        /**
         * 於目錄表下方處，產生對應的隱藏超連結。
         */
        const seq = getSeqNumber(fullFileName);
        const urlstr = genHrefString(texts.join('/'));

        /**
         * e.g : 去掉extension
         */
        const re = new RegExp(`\.${extension}`, 'g');
        const solName = fullFileName.replace(re, '');

        return {
          seq: seq,
          name: solName,
          url: urlstr,
          extension: extension,
        };
      })
      /**
       * 過濾掉無效的對象
       */
      .filter((url) => url !== null)
      /**
       * 使用seq來重新排序
       */
      .sort((a, b) => Number.parseInt(a.seq) - Number.parseInt(b.seq));

    return results;
  }

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
   * 儲存檔案
   * @param {string} url
   * @param {string} data
   */
  function save(url, data) {
    writeFile(url, data, function (err) {
      if (err) return console.log(err);
      console.log('\nAll work is finished successfully !');
    });
  }

  console.log('Start to build...');

  /**
   * 搜尋目錄下所有答案
   */
  const solutions = LANGS.flatMap(({ url, extension }) => {
    let sols = searchSolutionsUnderFolder(path.join(__dirname, url), extension);
    return sols;
  });

  /** 將solutions根據序號，小到大排序 */
  solutions.sort((a, b) => parseInt(a.seq) - parseInt(b.seq));

  /**
   * 並取出所有答案中最大的編號
   */
  const maxSeqNumber = parseInt(solutions[solutions.length - 1].seq);

  /**
   * 根據不同題目，將對應的答案以語言分類
   * e.g
   *  {
   *    '0001' : {
   *      'js': {...},
   *      'rs': {...},
   *    },
   *    '0003' : {
   *      'js': {...},
   *      'rs': {...},
   *    }
   *  }
   */
  const solsMap = solutions.reduce((prev, curr, i) => {
    const { seq, extension } = curr;
    const key = seq;
    if (!prev[key]) {
      prev[key] = {};
    }
    prev[key][extension] = curr;
    return prev;
  }, {});

  /**
   * 形成以下結構，以題目 > 語言 > 答案
   *
   * e.g
   *
   *  '1': {
   *     js: {
   *       seq: '0001',
   *       name: 'p0001_twoSum.js',
   *       url: '/JS/HashMap/easy/p0001_twoSum.js',
   *       extension: 'js'
   *     },
   *     rs: {
   *       seq: '0001',
   *       name: 'p0001_two_sum.rs',
   *       url: '/Rust/src/problems/p0001_two_sum.rs',
   *       extension: 'rs'
   *     }
   *   },
   *
   */
  const sumOfSolsGroupedByLang = solutions.reduce((prev, curr, i) => {
    if (!prev[curr.extension]) {
      prev[curr.extension] = 1;
    } else {
      prev[curr.extension] += 1;
    }
    return prev;
  }, {});

  /**
   * 不分使用的程式語言下，實際上總共完成了多少問題。
   */
  const numOfSolvedProblems = Object.keys(solsMap).length;

  console.log(
    `\nNow, you have: `,
    sumOfSolsGroupedByLang,
    `\nTotally,`,
    solutions.length,
    `solutions for`,
    numOfSolvedProblems,
    `problems.`
  );

  /**
   *
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

  const res = paras.join('\n');
  save(path.join(__dirname, OUT_PATH), res);
})();
