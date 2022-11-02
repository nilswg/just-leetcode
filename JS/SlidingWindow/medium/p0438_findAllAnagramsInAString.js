// @ts-check

// 題目鏈結
// https://leetcode.com/problems/find-all-anagrams-in-a-string

// 題目說明
// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
//

// Example 1:
// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".
//

// Example 2:
// Input: s = "abab", p = "ab"
// Output: [0,1,2]
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".
//

// Constraints:
// 1 <= s.length, p.length <= 3 * 10⁴
// s and p consist of lowercase English letters.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : 使用滑動窗
 * 
 * 設置滑動窗的左右邊界 lt, r，根據查找狀況進行動態調整，當滑動窗中的字段滿足時即為解，將該位址放入res。
 * (1) 初始 lt = -1； r = 0
 * (2) 滑動窗長度為 r - lt
 * (3) 滑動窗的最左側元素為 s[lt + 1]；最右側元素為 s[r] 
 * 
 * 動態調整滑動窗的左右邊界
 * (1) 每次加入新的字符時，檢查 pCnt 的數量是否大於 0:
 *     a. pCnt[s[i]] > 0 ，則再檢查滑動窗長度是否為 p.length
 *     b. pCnt[s[i]] = 0 ，表示無法形成答案。這時將不斷透過剔除最左側的字符 (lt+=1)，同時縮小滑動窗口，
 *                         直到狀態重新滿足 pCnt[s[i]] > 0；或是，因滑動窗大小為0 (r - lt = 0)，則跳過該字符。
 * 
 * 時間複雜度分析
 * 最糟狀況，當 s 與 p 兩者長度完全一致時，
 * 
 * 複雜度
 * Time Complexity : O(2*n) // n = s.length；m = p.length
 * Space Complexity: O(26)
 *
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagramsSlidingWindow = function (s, p) {
  const pCnt = new Array(26).fill(0);
  const n = s.length;

  for (let i = 0, m = p.length; i < m; i++) {
    pCnt[p.charCodeAt(i) % 26] += 1;
  }

  let lt = -1;
  let r = 0;
  let res = [];

  // T : O(s.length)
  while (r < n) {
    if (pCnt[s.charCodeAt(r) % 26] > 0) {
      // r - lt 為滑動窗的長度，當長度一致，表示滑動窗中的區段正是 Anagram ，
      // 將解將 lt +1 放入 res 中，之後移動lt 縮小滑動窗，繼續尋找下一解。
      if (r - lt === p.length) {
        res.push(lt + 1);
        pCnt[s.charCodeAt(lt + 1) % 26] += 1;
        lt += 1;
      }
      // r 持續尋找新的字符放入滑動窗中
      pCnt[s.charCodeAt(r) % 26] -= 1;
      r += 1;
    } else {
      // 滑動窗從左側剔除元素，直到找到該字符
      while (r - lt > 0 && pCnt[s.charCodeAt(r) % 26] === 0) {
        pCnt[s.charCodeAt(lt + 1) % 26] += 1;
        lt += 1;
      }
      // 如果滑動窗大小歸零時仍然沒有找到字符，表示字符不存在 p 中，直接跳過。
      if (pCnt[s.charCodeAt(r) % 26] === 0) {
        lt += 1;
        r += 1;
      }
    }
  }

  return res;
};

/**
 * Solution : 暴力解即是最佳解，亦使用到滑動窗的概念。
 * 
 * 概念非常簡單，因為本題與順序無關，僅與數量有關，直接比較 pCnt、sCnt 是否一致即可。
 * 此外，速度優化上當 i >= p.length - 1 時，才開此進行兩陣列的比較，其時間複雜度固定為 O(26)，
 * 故時間複雜度為 O(26*(s.length - p.length))
 *
 * 複雜度
 * Time Complexity : O(26*(n-m)) // n = s.length; m = p.length
 * Space Complexity: O(26)
 *
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagramsSlidingWindowOptimal = function (s, p) {
  const pCnt = new Array(26).fill(0);
  const sCnt = new Array(26).fill(0);
  const res = [];

  const isArrayEqual = (arr1, arr2) => {
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  for (let i = 0; i < p.length; i++) {
    let index = p.charCodeAt(i) % 26;
    pCnt[index]++;
  }

  for (let i = 0; i < s.length; i++) {
    let index = s.charCodeAt(i) % 26;
    sCnt[index]++;

    if (i > p.length - 1) {
      let headIndex = s.charCodeAt(i - p.length) % 26;
      sCnt[headIndex]--;
    }

    if (i >= p.length - 1 && isArrayEqual(pCnt, sCnt)) {
      res.push(i - (p.length - 1));
    }
  }

  return res;
};

// 測試
(function () {
  console.log('Testing [p0438_findAllAnagramsInAString]...');

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);

    console.log(isEqual(cb('cbaebabacd', 'abc'), [0, 6]));
    console.log(isEqual(cb('abab', 'ab'), [0, 1, 2]));
  };

  testingWith(findAnagramsSlidingWindow);
  testingWith(findAnagramsSlidingWindowOptimal);

  console.log('All Testing Passed ✅');
})();
