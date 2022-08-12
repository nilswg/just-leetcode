// @ts-check

// 題目鏈結
// https://leetcode.com/problems/longest-substring-without-repeating-characters

// 題目說明
// Given a string s, find the length of the longest substring without repeating characters.
//

// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
//

// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
//

// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
//

// Constraints:
// 0 <= s.length <= 5 * 10^4
// s consists of English letters, digits, symbols and spaces.
//

// 解題重點
// 0. 本題旨在找出最長且"不重複"的子字串長度。
// 1. 瞭解滑動窗與Queue，用來排除已被計數過的字符。
// 2. 瞭解HashTable，使用其記錄每個字符已出現的位址，來優化時間複雜度。

// 解題重點
// 1.可先使用暴力解，O(N^2) 找出所有子集合，再使用O(N!)

/**
 * Solution : 滑動窗口暴力解
 *
 * 1.透過雙指針，lt, i 去控制窗口的大小，
 * 2.每次新增一個元素時，就去查看窗口內的所有元素
 * 3.當發現有重複的元素，就移動 lt到該元素的位址，以縮小滑動窗大小。
 * 4.再由i - lt 計算出滑度窗的大小，並與 max 比較取最大者，最終返回max就是答案。
 *
 *    'x', 'a', 'b', 'c', 'b', 'a'
 *     -1   0    1    2    3    4
 *     ^                   ^
 *     lt                  i (由於'b'已經出現過，先將lt移到前次'b'的位址)
 *
 *    'x', 'a', 'b', 'c', 'b', 'a'
 *     -1   0    1    2    3    4
 *               ^         ^
 *               lt        i (此時我們才計算長度為 i-lt = 3-1 = 2)
 *
 * Time Complexity : O(N^2)
 * Space Complexity: O(1)
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringBrute = function (s) {
  let max = 0;
  let lt = -1;
  for (let i = 0, n = s.length; i < n; i++) {
    const c = s[i];
    // 檢查滑動窗內使否已有重複的元素，如果有就調整 lt 到重複元素的位址上，縮小滑動窗。
    for (let j = lt; j < i; j++) {
      if (s[j] === c) lt = j;
    }
    max = Math.max(max, i - lt);
  }
  return max;
};

/**
 * Solution : 滑動窗 + HashMap
 *
 * 1.透過雙指針，lt, i 去控制窗口的大小，
 * 2. 使用 hashMap 來保存每次出現的位置，則考慮以下可能
 *    (1) hashMap 中，尚沒出現過，得到 -1
 *    (2) hashMap 中，出現過，將 lt 移動到當前位置。
 * 3. 再由i - lt 計算出滑度窗的大小，並與 max 比較取最大者，最終返回max就是答案。
 *
 * 對比原先單滑動窗暴力解的作法，每次檢查滑動窗內的元素的時間複雜度為O(N)
 * 而使用 HashMap 優化此時間複雜度為 O(1)；空間複雜度變成 O(N)
 */
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let mp = new Map();
  let max = 0;
  let lt = -1;
  for (let i = 0, n = s.length; i < n; i++) {
    const c = s[i];
    lt = Math.max(lt, mp.get(c) ?? -1);
    max = Math.max(max, i - lt);
    mp.set(c, i);
  }
  return max;
};

// 測試
(function () {
  console.log('Testing 0003_lengthOfLongestSubstring...');

  const testingWith = (cb) => {
    console.log(cb('abcabcbb') === 3);
    console.log(cb('bbbbb') === 1);
    console.log(cb('pwwkew') === 3);
    console.log(cb('tmmzuxt') === 5);
    console.log(cb(' ') === 1);
    console.log(cb('@ *@/n') === 5);
  };

  console.log('Testing [lengthOfLongestSubstringBrute]');
  testingWith(lengthOfLongestSubstringBrute);

  console.log('Testing [lengthOfLongestSubstring]');
  testingWith(lengthOfLongestSubstring);

  console.log('All Testing Passed ✅');
})();
