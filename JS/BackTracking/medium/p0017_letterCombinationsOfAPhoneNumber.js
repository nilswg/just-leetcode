// @ts-check

import { isArrayEqual } from '../backTracking.js';

// 題目鏈結
// https://leetcode.com/problems/letter-combinations-of-a-phone-number

// 題目說明
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
// A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
//

// Example 1:
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
//

// Example 2:
// Input: digits = ""
// Output: []
//

// Example 3:
// Input: digits = "2"
// Output: ["a","b","c"]
//

// Constraints:
// 0 <= digits.length <= 4
// digits[i] is a digit in the range ['2', '9'].
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : 使用暴力解
 *
 * 空間複雜度分析
 * 因為每次加入新的字符時，每次都要從 strs 中，將所有組合取出，夠成為新的字串組合後再放入。
 * 故，這裡會使用到額外的 newStrs 暫存新的 strs 結果，故其空間複雜度為 strs.length的長度。
 * 為 O(4ⁿ)
 *
 * 複雜度
 * Time Complexity : O(4ⁿ) // 最糟狀況而言，每次按下的按鈕，都會對應到最大 4 個字符
 * Space Complexity: O(4ⁿ) //
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinationsBrute = function (digits) {
  if (!digits.length) return [];

  const buttons = [
    '', // 0
    '', // 1
    'abc', // 2
    'def', // 3
    'ghi', // 4
    'jkl', // 5
    'mno', // 6
    'pqrs', // 7
    'tuv', // 8
    'wxyz', // 9
  ];

  let strs = [...buttons[parseInt(digits.charAt(0))]];
  for (let i = 1, n = digits.length; i < n; i++) {
    const letters = buttons[parseInt(digits.charAt(i))];
    const newStrs = [];
    for (const s of strs) {
      for (const e of letters) {
        newStrs.push(s + e);
      }
    }
    strs = newStrs;
  }
  return strs;
};

/**
 * Solution : 使用 BackTracking
 *
 *           'st'             press-2 => ['a', 'b', 'c']
 *          /  |  \
 *         a   b   c          press-3 => ['d', 'e', 'f']
 *        /|\
 *       d e f
 *
 * 這裡的每條直線，都是雙向的，這能讓狀態回溯至底時(n = digits.length)，再次回到上一層狀態。
 *
 * 空間複雜度分析
 * 因為使用 dfs，故每次至底端時，都會得到一組新的答案放入strs中，故僅須考慮該走訪的最大深度。
 * 故為 O(n) (n = digits.length)
 *
 * 複雜度
 * Time Complexity : O(4ⁿ) // 最糟狀況而言，每次按下的按鈕皆對應到最大 4 個字符
 * Space Complexity: O(n)  // 即dfs最大深度，為 n = digits.length
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinationsBackTracking = function (digits) {
  if (!digits.length) return [];

  const buttons = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const n = digits.length;
  const strs = [];

  const dfs = (d, curr) => {
    if (curr.length === n) {
      strs.push(curr);
      return;
    }
    const letters = buttons[parseInt(digits.charAt(d)) - 2]; // <= 向左移2位
    for (let e of letters) {
      // 不需要額外寫 let temp = curr，此處傳入 curr + e
      // string 是字面量非指標，相當於複製一份給下一層。而該層curr沒有發生變化。
      dfs(d + 1, curr + e);
    }
  };
  dfs(0, '');
  return strs;
};

// 測試
(function () {
  console.log('Testing [p0017_letterCombinationsOfAPhoneNumber]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isArrayEqual(cb('2'), ['a', 'b', 'c']));
    console.log(
      isArrayEqual(cb('23'), [
        'ad',
        'bd',
        'cd',
        'ae',
        'be',
        'ce',
        'af',
        'bf',
        'cf',
      ])
    );
    console.log(
      isArrayEqual(cb('23'), [
        'ad',
        'bd',
        'cd',
        'ae',
        'be',
        'ce',
        'af',
        'bf',
        'cf',
      ])
    );
    console.log(
      isArrayEqual(cb('789'), [
        'ptw',
        'ptx',
        'pty',
        'ptz',
        'puw',
        'pux',
        'puy',
        'puz',
        'pvw',
        'pvx',
        'pvy',
        'pvz',
        'qtw',
        'qtx',
        'qty',
        'qtz',
        'quw',
        'qux',
        'quy',
        'quz',
        'qvw',
        'qvx',
        'qvy',
        'qvz',
        'rtw',
        'rtx',
        'rty',
        'rtz',
        'ruw',
        'rux',
        'ruy',
        'ruz',
        'rvw',
        'rvx',
        'rvy',
        'rvz',
        'stw',
        'stx',
        'sty',
        'stz',
        'suw',
        'sux',
        'suy',
        'suz',
        'svw',
        'svx',
        'svy',
        'svz',
      ])
    );
  };

  testingWith(letterCombinationsBrute);
  testingWith(letterCombinationsBackTracking);

  console.log('All Testing Passed ✅');
})();
