// @ts-check

// 題目鏈結
// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// 題目說明
// Given a string s, find the length of the longest substring without repeating characters.
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Input: s = "vbvg"
// Output: 3
// Explanation: The answer is "bvg", with the length of 3.

// 解題重點
// 1. 使用 hashMap 來保存每次出現的位置，則考慮以下可能
//    (1) hashMap 中，尚沒出現過，得到 undefined
//    (2) hashMap 中，出現過，且位置大於 lt，將 lt 移動到當前位置。
//    (3) hashMap 中，出現過，且位置小於 lt，表示尚沒被計算於此區段內;
//            's'..lt..'s'
//             ^        ^ 發現s重複，但s小於lt超出範圍內，因此s沒有重複，可以計入。
//
// 2. 承 1-(1)，將undifined預設為 -1，能與條件 1-(3) 合併。
//
//
// 3. 不需要額外的count，因為當前位置減去lt, 即目前最長有效的長度。
//    'a', 'b', 'c', 'a', 'b'
//     0    1    2    3    4
//     ^              ^ ('a'重覆)
//                    3 - 0 = 3 表示最長有效的長度為 3
//
// 4. 承3, 將 lt 設值為 -1，如此一來，可以更好統計長度
//    lt  'a', 'b'
//    -1   0    1
//              ^ 1-(-1) = 2

// 解題思路
// (略)

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let max = 0;
  let mp = new Map();
  let lt = -1;
  for (let i = 0; i < s.length; i++) {
    const cur = s.charAt(i);
    const pos = mp.get(cur) ?? -1;
    if (pos > lt) {
      lt = pos;
    }
    max = Math.max(i - lt, max);
    mp.set(cur, i);
  }
  return max;
};

// 測試
(function () {
  console.log('Testing 0003_lengthOfLongestSubstring...');

  console.log(lengthOfLongestSubstring('abcabcbb') === 3);
  console.log(lengthOfLongestSubstring('bbbbb') === 1);
  console.log(lengthOfLongestSubstring('pwwkew') === 3);
  console.log(lengthOfLongestSubstring('tmmzuxt') === 5);

  console.log('All Testing Passed ✅');
})();
