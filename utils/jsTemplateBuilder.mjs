// @ts-check

import { argv } from "node:process";

import fetch from "node-fetch";
import { writeFile } from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cp from "child_process";

(async function () {
  /** __filename */
  const __filename = fileURLToPath(import.meta.url);

  /** __dirname */
  const __dirname = dirname(__filename);

  const qId = argv[2];
  const qName = argv[3];

  const qFileName = `p${qId.padStart(4, "0")}_${camelize(qName)}`;
  console.log(qFileName);

  const outpath = path.join(
    __dirname,
    "../",
    `${argv[4] ?? ""}/${qFileName}.js`
  );

  console.log(outpath);

  // https://codingbeautydev.com/blog/javascript-string-to-camelcase/
  function camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : letter.toUpperCase()
      )
      .replace(/\s+|-/g, "");
  }

  /**
   * 取得 runScripts
   *
   * e.g: npm run build-js 542 01-matrix JS/BFS-DFS/medium @-index-debug
   *
   * -> {index: true, debug: true}
   */
  const allowedScripts = new Set(["index", "debug"]);

  const runScripts = (argv[5] ?? "").split("-").reduce((prev, curr) => {
    if (allowedScripts.has(curr)) {
      prev[curr] = true;
    }
    return prev;
  }, {});
  console.log(runScripts);

  /**
   * fetch Leetcode promblem from leet-api-code api
   */
  const url = `https://leet-api-code.herokuapp.com/api/v1/${qName}`;
  const response = await fetch(url);
  const body = await response.text();

  /**
   * e.g :
   *
   *   GET https://leet-api-code.herokuapp.com/api/v1/two-sum
   *
   *   data =
   *   {
   *    status_code: 200,
   *    message: [
   *      {
   *        slug: 'two-sum',
   *        name: 'Two Sum',
   *        difficulty: 1,
   *        is_premium: false
   *      },
   *      {
   *        content: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n' +
   *          'You may assume that each input would have exactly one solution, and you may not use the same element twice.\n' +
   *          'You can return the answer in any order.\n' +
   *          'Example 1:\n' +
   *          'Input: nums = [2,7,11,15], target = 9\n' +
   *          'Output: [0,1]\n' +
   *          'Output: Because nums[0] + nums[1] == 9, we return [0, 1].\n' +
   *          'Example 2:\n' +
   *          'Input: nums = [3,2,4], target = 6\n' +
   *          'Output: [1,2]\n' +
   *          'Example 3:\n' +
   *          'Input: nums = [3,3], target = 6\n' +
   *          'Output: [0,1]\n' +
   *          'Constraints:\n' +
   *          '2 <= nums.length <= 104\n' +
   *          '-109 <= nums[i] <= 109\n' +
   *          '-109 <= target <= 109\n' +
   *          'Only one valid answer exists.\n' +
   *          'Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?'
   *      }
   *    ]
   *  }
   */
  const data = JSON.parse(body);
  if (data["status_code"] === 404) {
    console.log(`獲取 ${qFileName} 失敗!`);
    return;
  }

  /**
   * @param {*} data
   * @returns {string}
   */
  function getContent(data) {
    let content = "";

    content += data?.["message"]?.[1]?.["content"];

    content = content
      .split("\n")
      .map((x) => `// ${x}`)
      .join("\n");

    content = content
      .replace(/Example/g, "\n\n// Example")
      .replace(/Constraints/g, "\n\n// Constraints")
      .replace(/Follow-up/g, "\n\n// Follow-up");

    /**
     *   將問題中的指數值修改成正確的數值形式
     *
     *   e.g : '1 <= nums.length <= 2 * 104'
     *
     *       ->'1 <= nums.length <= 2 * 10⁴'
     *
     *   e.g : '-107 <= k <= 107'
     *
     *       ->'-10⁷ <= k <= 10⁷'
     *
     */
    const expos = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
    for (let i = 1; i < 10; i++) {
      let expoValue = content.match(new RegExp(`\[-| \]10${i}`, "g"))?.[0]; // "<= 2 * 104" 、 "-104 <="
      if (!expoValue) continue;
      console.log("find exponential value:", expoValue);
      content = content
        .replace(` 10${i}`, ` 10${expos[i]}`) //"2 * 104" -> "2 * 10⁴"
        .replace(`-10${i} <=`, `-10${expos[i]} <=`); //"-104 <=" -> "-10⁴ <="
    }

    /**
     * e.g : -231 <= val <= 231 - 1
     * 
     *    -> -2³¹ <= val <= 2³¹ - 1
     */
    let twoExpoStrs = content.match(
      new RegExp(`-231 <= \[\\w\]\* <= 231 - 1`, "g")
    )?.[0];
    if (twoExpoStrs) {
      content = content
        .replace(/-231 <=/g, `-2³¹ <=`)
        .replace(/<= 231 - 1/g, `<= 2³¹ - 1`);
    }

    return content;
  }

  /**
   * 產生 Template
   */
  const outdata = `
// @ts-check

// 題目鏈結
// https://leetcode.com/problems/${qName}

// 題目說明
${getContent(data)}

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : 
 * 
 * 複雜度
 * Time Complexity : O(??)
 * Space Complexity: O(??)
 */

/**
 * Write some code here!
 */

// 測試
(function () {
  console.log('Testing [${qFileName}]...');

  // const testingWith = (cb) => { 
  //   console.log(\`Testing \${cb.name}\`);
  //  
  // }

  /**
   * Write Some Testing here
   */

  console.log('All Testing Passed ✅');
})();

  `;

  /**
   * save 儲存檔案
   */
  writeFile(outpath, outdata, function (err) {
    if (err) return console.log(err);
    console.log(`獲取 ${qFileName} 成功!`);
    console.log("\nAll work is finished successfully !");
  });

  if (runScripts["debug"]) {
    console.log("🚀 fork debugBuilder\n");
    cp.fork(path.join(__dirname, "./debugBuilder.mjs"));
  }

  if (runScripts["index"]) {
    console.log("🚀 fork indexBuilder\n");
    cp.fork(path.join(__dirname, "./indexBuilder.mjs"));
  }
})();
