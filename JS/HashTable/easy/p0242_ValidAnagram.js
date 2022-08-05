// @ts-check

// 題目鏈結
// https://leetcode.com/problems/valid-anagram/

// 題目說明
// Given two strings s and t,
// return true if t is an anagram of s, and false otherwise.

// Example 1:
//
// Input: s = "anagram", t = "nagaram"
// Output: true
//
// Example 2:
//
// Input: s = "rat", t = "car"
// Output: false

// 解題重點
// 瞭解HashMap的使用方式。
// 由於題目限制，儲存於的文字範圍必定是界在 a..z 之間，所以為固定大小的空間，空間複雜度為常數，表示為O(1)。(Constant Space)

// 解題思路
// 使用HashMap或是陣列(Array)去儲存使用過的文字，在檢查使用過的文字數量是否均為相等。

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)  // constant space

/**
 * 使用 Map 儲存
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagramMap = function (s, t) {
  let mp = {};
  for (const c of s) {
    mp[c] = (mp[c] ?? 0) + 1;
  }
  for (const c of t) {
    mp[c] = (mp[c] ?? 0) - 1;
  }
  for (const k of Object.keys(mp)) {
    if (mp[k] !== 0) {
      return false;
    }
  }
  return true;
};

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1) // constant space

/**
 * 更好的做法，是透過已知限制條件，可能出現的文字範圍必定是界在 a..z 之間
 * 透過固定大小的 list 去儲存。
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  let list = Array(26).fill(0);
  for (let i = 0, n = s.length; i < n; i++) {
    // 注意! 不要寫成這樣 s[i].charCodeAt(0),
    // 97 is 'a' charCode
    list[s.charCodeAt(i) - 97] += 1;
    list[t.charCodeAt(i) - 97] -= 1;
  }
  for (let i = 0; i < 26; i++) {
    if (list[i] !== 0) {
      return false;
    }
  }
  return true;
};

// 測試
(function () {
  console.log('Testing [p0242_isAnagram]...');

  console.log('isAnagramMap', isAnagramMap('anagram', 'nagaram') === true);
  console.log('isAnagramMap', isAnagramMap('rat', 'car') === false);
  console.log('isAnagramMap', isAnagramMap('aaaabb', 'aabaab') === true);
  console.log('isAnagramMap', isAnagramMap('aaaaab', 'aababa') === false);

  console.log('isAnagram', isAnagram('anagram', 'nagaram') === true);
  console.log('isAnagram', isAnagram('rat', 'car') === false);
  console.log('isAnagram', isAnagram('aaaabb', 'aabaab') === true);
  console.log('isAnagram', isAnagram('aaaaab', 'aababa') === false);

  console.log('All Testing Passed ✅');
})();

