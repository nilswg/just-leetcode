// @ts-check

import { printElapsedTime } from '../../BackTracking/backTracking.js';

// 題目鏈結
// https://leetcode.com/problems/word-break

// 題目說明
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
//

// Example 1:
// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
//

// Example 2:
// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
//

// Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false
//

// Constraints:
// 1 <= s.length <= 300
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 20
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : DFS 暴力解
 * 
 * n : s.length
 * K : wordDict.length
 *
 * 複雜度
 * Time Complexity : O(Kⁿ)
 * Space Complexity: O(n)
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreakBrute = function (s, wordDict) {
  // T: O(N);
  const valid = (st, word) => {
    if (st + word.length > s.length) return false;
    for (let i = 0, n = word.length; i < n; i++) {
      if (word[i] !== s[st + i]) return false;
    }
    return true;
  };

  const dfs = (s, i) => {
    if (i === s.length) {
      return true;
    }

    for (const word of wordDict) {
      // check word is valid
      if (!valid(i, word)) continue;
      // if exit continue
      if (dfs(s, i + word.length)) {
        return true;
      }
    }
    return false;
  };

  return dfs(s, 0);
};

/**
 * Solution : DP Memorization
 *
 * 我們到底透過 mem 去保存什麼結果 ?
 *
 * e.g: s = "aaaab", wordDict = ['a','aa','aaa','aaaa']
 *
 *      i      s[i]      wd
 *      0       'a'      'a'
 *      1       'a'      'a'
 *      2       'a'      'a'
 *      3       'a'      'a'
 * --------------------------------- 前面持續使用單個 'a' 可以來到最後一個字。
 *      4       'b'      'a'     //  不合
 *      4       'b'      'aa'    //  長度超過
 *      4       'b'      'aaa'   //  長度超過
 *      4       'b'      'aaaa'  //  長度超過
 *                                   i=4 時，已窮盡 wordDict 中所有可能仍無組合滿足。(mem[4] = false)
 *
 * --------------------------------- 回到前一位 4-1 = 3
 *      3       'ab'     'aa'    //  不合，考慮2位。
 *      3       'ab'     'aaa'   //  長度超過
 *      3       'ab'     'aaaa'  //  長度超過
 *                                   i=3 時，已窮盡 wordDict 中所有可能仍無組合滿足。(mem[3] = false)
 *
 * ---------------------------------  回到前一位 3-1 = 2
 *      2       'aa'     'aa'    //  符合，考慮2位。
 *      4       'b'      'x'     //  mem[4] 知道, 剩下1位'b'，必無法找到滿足的條件，回溯法到前一位 4-2 = 2
 *      2       'aab'    'aaa'   //  不合，考慮2位
 *      2       'aab'    'aaaa'  //  長度超過
 *                                   i=2 時，已窮盡 wordDict 中所有可能仍無組合滿足。(mem[2] = false)
 *
 * ---------------------------------  回到前一位 2-1 = 1。
 *      1       'aa'     'aa'    //  符合，考慮2位。
 *      3       'ab'     'x'     //  mem[3] 知道, 剩下2位'ab'，必無法找到滿足的條件，回溯法到前一位 3-2 = 1
 *      1       'aaa'    'aaa'   //  符合，考慮3位。
 *      4       'b'      'x'     //  mem[4] 知道, 剩下1位'b'，必無法找到滿足的條件，回溯法到前一位 4-3 = 1
 *      1       'aaab'   'aaaa'  //  不合
 *                                   i=1 時，已窮盡 wordDict 中所有可能仍無組合滿足。(mem[1] = false)
 *
 * ---------------------------------- 回到前一位 1-1 = 0。
 *      0       'aa'      'aa'    //  符合
 *      2       'aab'     'x'     //  mem[2] 知道, 剩下2位'aab'，必無法找到滿足的條件，回溯法到前一位 2-2 = 0
 *      0       'aaa'     'aaa'   //  符合
 *      3       'ab'      'x'     //  mem[3] 知道, 剩下2位'ab'，必無法找到滿足的條件，回溯法到前一位 3-3 = 0
 *      0       'aaaa'    'aaaa'  //  符合
 *      4       'aaaa'    'x'     //  mem[4] 知道, 剩下1位'b'，必無法找到滿足的條件，回溯法到前一位 4-4 = 0
 *                                    i=0 時，已窮盡 wordDict 中所有可能仍無組合滿足。(mem[0] = false)
 *
 * -> 最終返回 false
 *
 * 複雜度
 * Time Complexity : O(kn)  // n : s.length ; K : wordDict.length
 * Space Complexity: O(n)
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreakDP = function (s, wordDict) {
  let mem = new Map();

  const dfs = (s, i) => {
    if (mem.has(i)) {
      return mem.get(i);
    }

    if (i === s.length) {
      mem.set(i, true);
      return true;
    }

    for (const word of wordDict) {
      // check word is valid, O(N)
      if (!s.startsWith(word, i)) continue; // or if (s.indexOf(word, i) !== i) continue;
      
      // 表示s[0..i]片段，有word能匹配，之後 i + word.length 成為下次的起始點。
      if (dfs(s, i + word.length)) {
        mem.set(i, true);
        return true;
      }
    }
    
    // 已窮盡 wordDict 中所有可能仍無組合滿足。
    mem.set(i, false);
    return false;
  };

  return dfs(s, 0);
};

/**
 * Solution : 改用 BottomUp
 *
 * 透過前一個 TopDown 的解法，瞭解狀態是從字串s最後至前頭推回來。
 *
 * 複雜度
 * Time Complexity : O(kn)  // n : s.length ; K : wordDict.length
 * Space Complexity: O(n)
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreakBottomUp = function (s, wordDict) {
  const n = s.length;
  const mem = Array(n + 1).fill(null);
  mem[n] = true; // 當長度已經滿足時，返回 true

  for (let i = n - 1; i > -1; i--) {
    for (const word of wordDict) {
      if (mem[i + word.length] && s.startsWith(word, i)) {
        mem[i] = true;
        break;
      }
    }
    if (mem[i] === null) {
      mem[i] = false;
    }
  }

  return mem[0];
};

// 測試
(function () {
  console.log('Testing [p0139_wordBreak]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb('leetcode', ['leet', 'code']) === true);
    console.log(cb('applepenapple', ['apple', 'pen']) === true);
    console.log(
      cb('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']) === false
    );
    console.log(cb('aaaaaaa', ['aaaa', 'aaa']) === true);
    console.log(
      printElapsedTime(
        () =>
          cb('aaaaaaaaaaaaaab', [
            'a',
            'aa',
            'aaa',
            'aaaa',
            'aaaaa',
            'aaaaaa',
            'aaaaaaa',
            'aaaaaaaa',
            'aaaaaaaaa',
            'aaaaaaaaaa',
          ]) === false
      )
    );
  };

  testingWith(wordBreakBrute);
  testingWith(wordBreakDP);
  testingWith(wordBreakBottomUp);

  console.log('All Testing Passed ✅');
})();
