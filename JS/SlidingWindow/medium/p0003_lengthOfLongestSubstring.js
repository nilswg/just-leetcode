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
// 1. 如果找到的值，且比 lt 來得大，將 lt 移動到當前位置。
// 2. 否則，有兩種可能
//    (1) 尚沒出現過； 表示無重複 count + 1;
//
//    (2) 出現過；但是 < lt，表示尚沒被計算於此區段內，所以仍可以 count + 1;
//            s--lt--s
//            ^      ^ 此次s可以被計入。
//

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
  let count = 0;
  let mp = new Map();
  let lt = -1;
  for (let i = 0; i < s.length; i++) {
    const cur = s.charAt(i);
    const pos = mp.get(cur) ?? -1;
    if (pos > lt) {
      lt = pos;
      count = i - pos;
      mp.set(cur, i);
    } else {
      count += 1;
      max = Math.max(max, count);
      mp.set(cur, i);
    }
  }
  return max;
};

// 測試
(function () {
  console.log('Testing 0003_lengthOfLongestSubstring...');

  console.log(lengthOfLongestSubstring("abcabcbb")===3);
  console.log(lengthOfLongestSubstring("bbbbb")===1);
  console.log(lengthOfLongestSubstring("pwwkew")===3);
  console.log(lengthOfLongestSubstring("tmmzuxt")===5);

  console.log('All Testing Passed ✅');
})();
