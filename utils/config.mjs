const CONFIG = {
  /** LANGS 描述將被作為產生目錄的語言目錄位置等資訊。 */
  LANGS: [
    { lang: 'JavaScript', url: '../JS', extension: 'js' },
    { lang: 'Rust', url: '../Rust', extension: 'rs' },
  ],

  /** GITHUB_URL 對應GitHub上的根目錄網址 */
  GITHUB_URL: `https://github.com/nilswg/just-leetcode/blob/main/`,

  /**專案目錄名稱 */
  PROJECT_DIRNAME: 'just-leetcode',

  /** 目錄的生成路徑 */
  INDEX_OUT_PATH: '../README.md',

  /** Debug文件的生成路徑 */
  DEBUG_OUT_PATH: '../.vscode/launch.json',
};

export default CONFIG;
